"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [];
const fetchAll = () => {
    return users;
};
const fetchUserById = (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        return null;
    }
    return user;
};
exports.default = {
    fetchAll,
    fetchUserById,
};
