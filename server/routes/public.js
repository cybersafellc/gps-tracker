import express from "express";
import userController from "../controllers/user-controller.js";

const router = express.Router();
router.post("/users", userController.create);
router.post("/users/login", userController.login);
export default router;
