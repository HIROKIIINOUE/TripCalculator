"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.DEV_PORT;
app.use("/users", user_route_1.default);
app.use((req, res) => {
    res.status(404).send("Invalid Page");
});
app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
});
