import express from "express";
const subcategoryRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listSubcategory,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  toggleSubcategory,
} from "../controller/subcategory.controller.js";

//? ============================================= Subcategory CRUD =============================================

subcategoryRouter.get("/list-subcategory", listSubcategory);
subcategoryRouter.get("/get-subcategory/:slug", getSubcategory);
subcategoryRouter.post("/create-subcategory", createSubcategory);
subcategoryRouter.put("/update-subcategory/:id", updateSubcategory);
subcategoryRouter.put("/toggle-subcategory/:id", toggleSubcategory);

export default subcategoryRouter;
