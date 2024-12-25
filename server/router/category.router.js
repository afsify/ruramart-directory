import express from "express";
const categoryRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listCategory,
  getCategory,
  createCategory,
  updateCategory,
  toggleCategory,
} from "../controller/category.controller.js";

//? ============================================= Category CRUD =============================================

categoryRouter.get("/list-category", listCategory);
categoryRouter.get("/get-category/:slug", getCategory);
categoryRouter.post("/create-category", createCategory);
categoryRouter.put("/update-category/:id", updateCategory);
categoryRouter.put("/toggle-category/:id", toggleCategory);

export default categoryRouter;
