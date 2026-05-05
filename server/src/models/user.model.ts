import { User } from "../types/user.type";

const users: User[] = [];

const fetchAll = () => {
  return users;
};

const fetchUserById = (id: string) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return user;
};

export default {
  fetchAll,
  fetchUserById,
};
