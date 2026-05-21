import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const generateTokens = (id: number) => {
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

export const verifyAccessToken = (accessToken: string) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw Error("access token key is not set");
  }
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
};
