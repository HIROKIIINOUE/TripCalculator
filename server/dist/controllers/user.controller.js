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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const user_schema_1 = require("../schemas/user.schema");
// get all users　ここのレスポンスはパスワード省いて
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.fetchAll();
        const publicUsers = users.map((user) => {
            return {
                id: user.id,
                displayName: user.displayName,
                Language: user.language,
            };
        });
        res.status(200).json(publicUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// get unique user
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.fetchById(Number(id));
        if (!user) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// user signup
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = user_schema_1.createUserSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: parsed.error.issues });
        return;
    }
    const { displayName, email, password, language } = parsed.data;
    const passwordScore = (0, zxcvbn_1.default)(password).score;
    if (passwordScore <= 1) {
        res.status(400).json({ message: "password is too weak" });
        return;
    }
    try {
        const newUser = yield user_model_1.default.add({
            displayName,
            email,
            password,
            language,
        });
        if (!newUser) {
            res.status(400).json({ message: "User exists already" });
            return;
        }
        const { password: _password } = newUser, publicUser = __rest(newUser, ["password"]);
        res.status(201).json(publicUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = user_schema_1.loginUserSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: parsed.error.issues });
        return;
    }
    const { email, password } = parsed.data;
    try {
        const loggedInUser = yield user_model_1.default.checkAuth({
            email,
            password,
        });
        if (!loggedInUser) {
            res.status(401).json({ message: "username or password is wrong" });
            return;
        }
        res.cookie("isLogin", true, {
            maxAge: 30 * 60 * 1000,
            httpOnly: true,
            signed: true,
        });
        const { password: _password } = loggedInUser, publicUser = __rest(loggedInUser, ["password"]);
        res.status(200).json(publicUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" });
    }
});
// user update
// NOTE: Revise Request's Type
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = yield user_model_1.default.update(Number(id), updateData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield user_model_1.default.remove(Number(id));
        if (!deletedUser) {
            res.status(400).json({ message: "Failed to delete the user" });
            return;
        }
        res.status(200).json(deletedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllUsers,
    getUserById,
    addUser,
    login,
    updateUser,
    deleteUser,
};
