"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = [];
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.findMany();
});
const fetchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        return null;
    }
    return user;
});
const add = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const users = yield fetchAll();
    const existUser = users.find((user) => user.email === email);
    if (existUser) {
        return null;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    return yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
    });
});
const checkAuth = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const targetUser = yield prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!targetUser) {
        return null;
    }
    const isPassword = yield bcrypt_1.default.compare(password, targetUser.password);
    if (!isPassword) {
        return null;
    }
    return targetUser;
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.update({
        where: { id },
        data,
    });
});
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.delete({ where: { id } });
});
exports.default = {
    fetchAll,
    fetchById,
    add,
    checkAuth,
    update,
    remove,
};
