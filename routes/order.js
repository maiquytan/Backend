import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", orderController.getOrder);
router.get("/user", orderController.getOrder);
router.get("//:id", orderController.getOrderById);
router.post("/createOrder", orderController.createOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
