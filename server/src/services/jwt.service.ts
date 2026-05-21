import jwt from "jsonwebtoken";

export const generateTokens = (id: number) => {
  const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw Error("Secret keys are not set");
  }

  const payload = {
    sub: String(id),
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};
