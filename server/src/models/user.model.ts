import { User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { LoginUserBody } from "../schemas/user.schema";

const fetchAll = async () => {
  return await prisma.user.findMany();
};

const fetchById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return null;
  }
  return user;
};

// Create new user
const add = async (data: Omit<User, "id" | "hashedRefreshToken">) => {
  const { email, password } = data;

  const existUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existUser) {
    return null;
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  return newUser;
};

// Check user's login
const checkAuth = async (data: LoginUserBody) => {
  const { email, password } = data;
  const targetUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!targetUser) {
    return null;
  }
  const isPassword = await bcrypt.compare(password, targetUser.password);
  if (!isPassword) {
    return null;
  }
  return targetUser;
};

// Store user's refresh token on DB after success in login
const storeHashedRefreshToken = async (id: number, refreshToken: string) => {
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
  await prisma.user.update({
    where: { id },
    data: { hashedRefreshToken },
  });
};

// compare user's refresh token with refresh token on DB
const checkHashedRefreshToken = async (id: number, refreshToken: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user?.hashedRefreshToken) {
    return false;
  }
  const isCorrectRefreshToken = await bcrypt.compare(
    refreshToken,
    user.hashedRefreshToken,
  );

  return isCorrectRefreshToken;
};

const removeRefreshToken = async (id: number) => {
  const targetUser = await prisma.user.update({
    where: { id },
    data: {
      hashedRefreshToken: null,
    },
  });
  return targetUser;
};

export default {
  fetchAll,
  fetchById,
  add,
  checkAuth,
  storeHashedRefreshToken,
  checkHashedRefreshToken,
  removeRefreshToken,
};
