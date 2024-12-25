import express from "express";
const vendorRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listVendor,
  getVendor,
  createVendor,
  updateVendor,
  toggleVendor,
} from "../controller/vendor.controller.js";

//? ============================================= Vendor CRUD =============================================

vendorRouter.get("/list-vendor", listVendor);
vendorRouter.get("/get-vendor/:slug", getVendor);
vendorRouter.post("/create-vendor", createVendor);
vendorRouter.put("/update-vendor/:id", updateVendor);
vendorRouter.put("/toggle-vendor/:id", toggleVendor);

export default vendorRouter;
