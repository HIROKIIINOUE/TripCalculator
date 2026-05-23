import { Request, Response } from "express";
import userModel from "../models/user.model";
import zxcvbn from "zxcvbn";
import { User } from "../generated/prisma/client";
import { handlePrismaUserError } from "../lib/prisma.errors";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import {
  generateTokens,
  regenerateAccessToken,
  verifyRefreshToken,
} from "../services/jwt.service";

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.fetchAll();
    const publicUsers = users.map((user) => {
      return {
        id: user.id,
        displayName: user.displayName,
        Language: user.language,
      };
    });
    res.status(200).json(publicUsers);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get unique user
const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const user: User | null = await userModel.fetchById(Number(id));
    if (!user) {
      res.status(400).json({ message: "User Not Found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// user signup
const addUser = async (req: Request, res: Response) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues });
    return;
  }
  const { displayName, email, password, language } = parsed.data;

  const passwordScore = zxcvbn(password).score;
  if (passwordScore <= 1) {
    res.status(400).json({ message: "password is too weak" });
    return;
  }

  try {
    const newUser: User | null = await userModel.add({
      displayName,
      email,
      password,
      language,
    });
    if (!newUser) {
      res.status(409).json({ message: "User exists already" });
      return;
    }
    const {
      password: _password,
      email: _email,
      hashedRefreshToken: _hashedRefreshToken,
      ...publicUser
    } = newUser;
    res.status(201).json(publicUser);
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// user login
const login = async (req: Request, res: Response) => {
  const parsed = loginUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues });
    return;
  }
  const { email, password } = parsed.data;
  try {
    const loggedInUser: User | null = await userModel.checkAuth({
      email,
      password,
    });
    if (!loggedInUser) {
      res.status(401).json({ message: "username or password is wrong" });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(loggedInUser.id);
    void (await userModel.storeHashedRefreshToken(
      loggedInUser.id,
      refreshToken,
    ));
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    res.status(200).json({
      id: loggedInUser.id,
      displayName: loggedInUser.displayName,
      language: loggedInUser.language,
      accessToken,
    }); // use accessToken in Authorization Bearer
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

// <JWT> refresh access token based on refresh token
const restoreAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.signedCookies;
  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required" });
    return;
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired refresh token" });
    return;
  }

  if (typeof payload === "string" || !payload.sub) {
    res.status(400).json({ message: "Invalid or expired refresh token" });
    return;
  }

  const id = Number(payload.sub);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }

  try {
    const isCorrectRefreshToken = await userModel.checkHashedRefreshToken(
      id,
      refreshToken,
    );

    if (isCorrectRefreshToken) {
      const accessToken = regenerateAccessToken(id);
      res.status(200).json({
        accessToken,
      });
    } else {
      res.status(401).json({ message: "Wrong refresh token" });
    }
  } catch (error) {
    if (handlePrismaUserError(error, res)) {
      return;
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  login,
  restoreAccessToken,
};
