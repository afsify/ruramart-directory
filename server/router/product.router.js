import express from "express";
const productRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listProduct,
  getProduct,
  createProduct,
  updateProduct,
  toggleProduct,
} from "../controller/product.controller.js";

//? ============================================= Product CRUD =============================================

productRouter.get("/list-product", listProduct);
productRouter.get("/get-product/:slug", getProduct);
productRouter.post("/create-product", createProduct);
productRouter.put("/update-product/:id", updateProduct);
productRouter.put("/toggle-product/:id", toggleProduct);

export default productRouter;
