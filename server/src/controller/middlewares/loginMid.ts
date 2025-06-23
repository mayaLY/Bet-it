// middlewares/checkUser.ts

import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user/userModel";
import jwt from "jsonwebtoken";

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

export const checkUser = async (req: any, res: any, next: NextFunction) => {
  try {
   console.log("im in middleware");
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as { userId: string };
   
    const userDB = await User.findById(decoded.userId);

    if (!userDB) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = userDB;
    console.log("all fine in middleware");
    next();
  } catch (error) {
    console.error("JWT middleware error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
