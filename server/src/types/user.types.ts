import { User } from "../generated/prisma/client";

export type CreateUserBody = Omit<User, "id">;
export type UpdateUserBody = Partial<CreateUserBody>;
export type PublicUserBody = Omit<User, "password">;
