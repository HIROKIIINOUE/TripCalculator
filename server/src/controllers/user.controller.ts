import { Request, Response } from "express";
import userModel from "../models/user.model";
import { UpdateUserBody } from "../types/user.types";
import zxcvbn from "zxcvbn";
import { Language, User } from "../generated/prisma/client";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

// get all users　ここのレスポンスはパスワード省いて
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
      res.status(400).json({ message: "User exists already" });
      return;
    }
    const { password: _password, ...publicUser } = newUser;
    res.status(201).json(publicUser);
  } catch (error) {
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
    const { password: _password, ...publicUser } = loggedInUser;
    res.status(200).json(publicUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

// user update
// NOTE: Revise Request's Type
const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserBody>,
  res: Response,
) => {
  const { id } = req.params;
  const updateData: UpdateUserBody = req.body;

  try {
    const updatedUser = await userModel.update(Number(id), updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete user
const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.remove(Number(id));
    if (!deletedUser) {
      res.status(400).json({ message: "Failed to delete the user" });
      return;
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  login,
  updateUser,
  deleteUser,
};
