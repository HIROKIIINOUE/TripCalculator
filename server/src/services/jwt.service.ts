// generate and verify access token and refresh token
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;

export const generateTokens = (id: number) => {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw Error("Secret keys are not set");
  }

  const payload = {
    sub: String(id), // turned into String for JWT
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (accessToken: string) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw Error("access token secret key is not set");
  }
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (refreshToken: string) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw Error("refresh token secret key is not set");
  }
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
};

export const regenerateAccessToken = (id: number) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw Error("access token secret key is not set");
  }
  const payload = {
    sub: String(id), // turned into String for JWT
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};
