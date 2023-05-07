import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProduct);
router.post("/create", productController.createProduct);
router.post("/update/:id", productController.updateProducts);
router.delete("/delete/:id", productController.deleteProducts);

export default router;
