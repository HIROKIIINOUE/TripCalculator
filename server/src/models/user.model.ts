import { prisma } from "../lib/prisma";
import { User } from "../types/user.type";

const users: User[] = [];

const fetchAll = async () => {
  return await prisma.user.findMany();
};

const fetchUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return null;
  }
  return user;
};

export default {
  fetchAll,
  fetchUserById,
};
