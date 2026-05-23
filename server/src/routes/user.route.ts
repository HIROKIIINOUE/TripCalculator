import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.restoreAccessToken);

export default userRouter;
