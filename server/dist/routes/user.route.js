"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controller_1.default.getAllUsers);
userRouter.get("/:id", user_controller_1.default.getUserById);
userRouter.post("/", user_controller_1.default.addUser);
userRouter.put("/:id", user_controller_1.default.updateUser);
userRouter.delete("/:id", user_controller_1.default.deleteUser);
exports.default = userRouter;
