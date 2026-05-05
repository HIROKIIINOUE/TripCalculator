import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
dotenv.config();

const app = express();
const PORT = process.env.DEV_PORT;

app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
