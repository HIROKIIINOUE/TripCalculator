import { Response } from "express";
import { Prisma } from "../generated/prisma/client";

export const handlePrismaUserError = (error: unknown, res: Response) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false;
  }

  // P2002 = Unique constraint violation
  if (error.code === "P2002") {
    res.status(409).json({ message: "User exists already" });
    return true;
  }

  // P2025 = Record not found
  if (error.code === "P2025") {
    res.status(404).json({ message: "User was not found" });
    return true;
  }

  return false;
};
