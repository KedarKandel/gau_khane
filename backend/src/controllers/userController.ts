import type { Response } from "express";
import { deleteUser, getAllUsers } from "../services/userService.ts";
import type { AuthRequest } from "../types/index.ts";

export const deleteUserController = async (req: AuthRequest, res: Response) => {
  const loggedInUser = req.user;
  const { id } = req.params;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID parameter" });
  }

  // Authorization check
  if (loggedInUser?.id !== id && loggedInUser?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only delete your account" });
  }
  const result = await deleteUser(id);
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(500).json(result);
};

export const getAllUsersController = async (
  req: AuthRequest,
  res: Response
) => {


  try {
    // Only allow if user is admin
    if (!req.user || req.user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const result = await getAllUsers();
    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    return res.json(result.users);
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
