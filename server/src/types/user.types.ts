export type User = {
  id: number;
  displayName: string;
  email: string;
  password: string;
};

export type CreateUserBody = Omit<User, "id">;

export type UpdateUserBody = Partial<CreateUserBody>;
