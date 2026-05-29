import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter.get("/me", authMiddleware, userController.getCurrentUser);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.restoreAccessToken);
userRouter.post("/logout", userController.logout);
userRouter.delete("/me", authMiddleware, userController.deleteUser);

export default userRouter;
