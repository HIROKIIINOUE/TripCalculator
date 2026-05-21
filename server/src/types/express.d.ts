// extend Express Request to store the authenticated user's id.
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export {};
