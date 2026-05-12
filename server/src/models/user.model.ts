import { User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

const users: User[] = [];

const fetchAll = async () => {
  return await prisma.user.findMany();
};

const fetchById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return null;
  }
  return user;
};

const add = async (data: Omit<User, "id">) => {
  const { email, password } = data;

  const users = await fetchAll();
  const existUser = users.find((user) => user.email === email);
  if (existUser) {
    return null;
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

const update = async (id: number, data: Partial<User>) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

const remove = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};

export default {
  fetchAll,
  fetchById,
  add,
  update,
  remove,
};
