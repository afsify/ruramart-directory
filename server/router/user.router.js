import express from "express";
const userRouter = express.Router();
import { userAuth } from "../middleware/auth.js";
import {
  findUser,
  updateProfile,
} from "../controller/user/account.controller.js";
import {
  checkOTP,
  contactMessage,
  forgotPassword,
  getAbout,
  getUser,
  listBanner,
  login,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../controller/user/user.controller.js";

//? ============================================= Authorization =============================================

userRouter.post("/send-otp", sendOTP);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/login", login);
userRouter.get("/get-user", userAuth, getUser);

//? ============================================ Forgot Password ============================================

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/check-otp", checkOTP);
userRouter.post("/reset-password", resetPassword);

//? =============================================== Home Page ===============================================

userRouter.get("/list-banner", listBanner);

//? ================================================ Contact ================================================

userRouter.post("/contact-message", contactMessage);

//? ================================================= About =================================================

userRouter.get("/get-about", getAbout);

//? ================================================ Profile ================================================

userRouter.post("/update-profile", userAuth, updateProfile);
userRouter.get("/find-user", userAuth, findUser);

export { userRouter };
