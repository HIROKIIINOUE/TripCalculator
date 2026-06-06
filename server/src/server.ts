import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import tripRouter from "./routes/trip.route";
dotenv.config();

const app = express();
const PORT = process.env.DEV_PORT;
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(
  cors({
    origin: [`${process.env.DEV_FRONT_URL}`],
    credentials: true,
  }),
);

app.use("/users", userRouter);
app.use("/trips", tripRouter);

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
