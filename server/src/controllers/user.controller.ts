import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user.type";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userModel.fetchAll();
  res.status(200).json(users);
};

// NOTE:Request Type
const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const user: User | null = await userModel.fetchUserById(Number(id));
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
    return;
  }
  res.status(200).json(user);
};

export default {
  getAllUsers,
  getUserById,
};
