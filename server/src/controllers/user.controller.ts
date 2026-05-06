import { Request, Response } from "express";
import userModel from "../models/user.model";
import { CreateUserBody, UpdateUserBody, User } from "../types/user.types";

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.fetchAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// user signin
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
const addUser = async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { displayName, email, password } = req.body;

  try {
    const newUser = await userModel.add({ displayName, email, password });
    if (!newUser) {
      res.status(400).json({ message: "Failed to add user" });
      return;
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  updateUser,
  deleteUser,
};
