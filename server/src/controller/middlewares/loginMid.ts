import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user/userModel";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as { userId: string };

    const userDB = await User.findById(decoded.userId);

    if (!userDB) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = userDB;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Invalid token" });
  }
}