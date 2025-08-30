import type { Response } from "express";
import { deleteUser } from "../services/userService.ts";
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

export default deleteUserController;
