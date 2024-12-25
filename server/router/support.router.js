import express from "express";
const supportRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listSupport,
  getSupport,
  createSupport,
  updateSupport,
  deleteSupport,
  updateSupportStatus,
  handleSupportReturn,
  handleSupportCancellation,
  handleSupportReturnStatus,
  assignSupport,
} from "../controller/support.controller.js";

//? ============================================= Support CRUD =============================================

supportRouter.get("/list-support", listSupport);
supportRouter.get("/get-support/:id", getSupport);
supportRouter.post("/create-support", createSupport);
supportRouter.put("/update-support/:id", updateSupport);
supportRouter.delete("/delete-support/:id", deleteSupport);

//? ============================================= Support Status =============================================

supportRouter.put("/assign-support/:id", assignSupport);
supportRouter.patch("/support-status/:id", updateSupportStatus);

export default supportRouter;
