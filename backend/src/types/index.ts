// src/types/index.ts
import type { Request } from "express";

export interface AuthRequest extends Request {
  user?: { 
    id: string; 
    role: "user" | "admin" | "farmer"; 
  };
}


