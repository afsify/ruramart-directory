import express from "express";
const adminRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  bannerStatus,
  deleteBanner,
  editBanner,
  insertBanner,
  listBanner,
} from "../controller/admin/banner.controller.js";
import {
  blockUser,
  getAdmin,
  listDashboard,
  listFeedback,
  listUser,
  signIn,
  unblockUser,
  updateAbout,
} from "../controller/admin/admin.controller.js";

//? ============================================= Authorization =============================================

adminRouter.post("/signin", signIn);
adminRouter.get("/get-admin", protect, getAdmin);

//? ============================================== Dashboard ==============================================

adminRouter.get("/list-dashboard", protect, listDashboard);

//? ============================================== User Manage ==============================================

adminRouter.get("/list-user", protect, listUser);
adminRouter.post("/block-user/:userId", protect, blockUser);
adminRouter.post("/unblock-user/:userId", protect, unblockUser);

//? ============================================= Banner Manage =============================================

adminRouter.get("/list-banner", protect, listBanner);
adminRouter.post("/insert-banner", protect, insertBanner);
adminRouter.post("/edit-banner/:bannerId", protect, editBanner);
adminRouter.post("/banner-status/:bannerId", protect, bannerStatus);
adminRouter.delete("/delete-banner/:bannerId", protect, deleteBanner);

//? ================================================ Feedback ================================================

adminRouter.get("/list-feedback", protect, listFeedback);

//? ================================================ Settings ================================================

adminRouter.post("/update-about/:adminId", protect, updateAbout);

export default adminRouter;
