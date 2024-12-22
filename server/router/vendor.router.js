import express from "express";
const vendorRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import { createVendor } from "../controller/vendor/vendor.controller.js";

//? ============================================= Authorization =============================================

vendorRouter.post("/",  createVendor);

export default vendorRouter;
