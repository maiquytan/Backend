import express from "express";
import userController from "../controllers/userController.js";
import middlewareController from "../controllers/middlewareController.js";

const router = express.Router();

router.get("/", userController.getAllUsers);

//DELETE USER
router.delete("/:id", userController.deleteUser);

export default router;
