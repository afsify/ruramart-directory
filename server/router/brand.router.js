import express from "express";
const brandRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listBrand,
  getBrand,
  createBrand,
  updateBrand,
  toggleBrand,
} from "../controller/brand.controller.js";

//? ============================================= Brand CRUD =============================================

brandRouter.get("/list-brand", listBrand);
brandRouter.get("/get-brand/:slug", getBrand);
brandRouter.post("/create-brand", createBrand);
brandRouter.put("/update-brand/:id", updateBrand);
brandRouter.put("/toggle-brand/:id", toggleBrand);

export default brandRouter;
