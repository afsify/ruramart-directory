import express from "express";
const adminRouter = express.Router();
import { adminAuth } from "../middleware/auth.js";
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
adminRouter.get("/get-admin", adminAuth, getAdmin);

//? ============================================== Dashboard ==============================================

adminRouter.get("/list-dashboard", adminAuth, listDashboard);

//? ============================================== User Manage ==============================================

adminRouter.get("/list-user", adminAuth, listUser);
adminRouter.post("/block-user/:userId", adminAuth, blockUser);
adminRouter.post("/unblock-user/:userId", adminAuth, unblockUser);

//? ============================================= Banner Manage =============================================

adminRouter.get("/list-banner", adminAuth, listBanner);
adminRouter.post("/insert-banner", adminAuth, insertBanner);
adminRouter.post("/edit-banner/:bannerId", adminAuth, editBanner);
adminRouter.post("/banner-status/:bannerId", adminAuth, bannerStatus);
adminRouter.delete("/delete-banner/:bannerId", adminAuth, deleteBanner);

//? ================================================ Feedback ================================================

adminRouter.get("/list-feedback", adminAuth, listFeedback);

//? ================================================ Settings ================================================

adminRouter.post("/update-about/:adminId", adminAuth, updateAbout);

export { adminRouter };
