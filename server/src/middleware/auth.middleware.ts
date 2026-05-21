import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/jwt.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: "Access token is required" });
    return;
  }
  if (!authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Invalid authorization header format" });
    return;
  }

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({ message: "Access token is required" });
    return;
  }
  try {
    const payload = verifyAccessToken(accessToken);
    if (payload.sub) {
      req.userId = Number(payload.sub);
      next();
    } else {
      res.status(401).json({ message: "You are not logged in" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired access token" });
  }
};
