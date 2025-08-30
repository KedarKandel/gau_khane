// routes/userRoutes.ts
import { Router } from "express";
import { deleteUserController } from "../controllers/userController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

// Route should be just "/:id" because you already mounted "/api/users" in app.ts
router.delete("/:id", authMiddleware, deleteUserController);

export default router;
