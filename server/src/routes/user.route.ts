import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.restoreAccessToken);

export default userRouter;
