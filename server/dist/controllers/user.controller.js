"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllUsers = (req, res) => {
    const users = user_model_1.default.fetchAll();
    res.status(200).json(users);
};
// NOTE:Request Type
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.fetchUserById(id);
    if (!user) {
        res.status(400).json({ message: "User Not Found" });
        return;
    }
    res.status(200).json(user);
};
exports.default = {
    getAllUsers,
    getUserById,
};
