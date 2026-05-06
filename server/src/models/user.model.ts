import { prisma } from "../lib/prisma";
import { User } from "../types/user.types";

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
  return await prisma.user.create({ data });
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
