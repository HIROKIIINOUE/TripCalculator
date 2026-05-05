import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.DEV_PORT;

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
