import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import tripRouter from "./routes/trip.route";
import eventRouter from "./routes/event.route";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const allowedOrigin = process.env.FRONT_URL?.trim();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use(
  cors({
    origin: (origin, callback) => {
      // origin -> リクエストを送ってくる元のURL
      // callback -> nullはエラー無しの意味、trueは「このURLを許可する」という意味
      if (!origin) {
        callback(null, true);
        return;
      }

      if (origin === allowedOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin is not allowed"));
    },
    credentials: true,
  }),
);

app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/users", userRouter);
app.use("/trips", tripRouter);
app.use("/events", eventRouter);

app.use((req, res) => {
  res.status(404).send("Invalid Page");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
