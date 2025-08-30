// routes/userRoutes.ts
import { Router } from "express";
import { deleteUserController, getAllUsersController } from "../controllers/userController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.get("/", authMiddleware, getAllUsersController);
router.delete("/:id", authMiddleware, deleteUserController);

export default router;
