import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/index.ts";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] as string | undefined;

  const token = authHeader?.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    //must pass user details except password
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: "user" | "admin" | "farmer";
    };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
