import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();


// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/:id", getProductById);


// ADMIN ROUTES
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;