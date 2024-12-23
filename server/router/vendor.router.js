import express from "express";
const vendorRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  createVendor,
  getBySlug,
  listVendor,
  toggleVendor,
  updateVendor,
} from "../controller/vendor/vendor.controller.js";

//? ============================================= Authorization =============================================

vendorRouter.post("/create-vendor", createVendor);
vendorRouter.get("/list-vendor", listVendor);
vendorRouter.get("/get-by/:slug", getBySlug);
vendorRouter.put("/update-vendor/:id", updateVendor);
vendorRouter.put("/toggle-vendor/:id", toggleVendor);

export default vendorRouter;
