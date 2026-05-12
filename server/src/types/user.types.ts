import { User } from "../generated/prisma/client";

// export type CreateUserBody = Omit<User, "id">;
export type UpdateUserBody = Partial<User>;
export type PublicUserBody = Omit<User, "password">;
