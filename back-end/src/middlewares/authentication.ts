import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
export const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "unauthentication" });
    return;
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token", error });
  }
};
