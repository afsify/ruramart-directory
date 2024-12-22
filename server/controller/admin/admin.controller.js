import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../../model/user.model.js";
import { Admin } from "../../model/admin.model.js";
import { AppError } from "../../middleware/error.js";
import { Feedback } from "../../model/feedback.model.js";

//! ============================================== Verify Login ==============================================

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const adminData = await Admin.findOne({ email });
  if (adminData) {
    const isMatch = await bcrypt.compare(password, adminData.password);
    if (isMatch) {
      let token = jwt.sign(
        { id: adminData._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      return res
        .status(200)
        .send({ message: "Signin Success", success: true, token });
    } else {
      throw new AppError("Incorrect Password");
    }
  } else {
    throw new AppError("Incorrect Email");
  }
});

//! =============================================== Admin Info ===============================================

export const getAdmin = asyncHandler(async (req, res) => {
  let adminData = await Admin.findById(req.adminId, {
    password: 0,
  });
  if (adminData) {
    const adminDetail = {
      email: adminData.email,
    };
    return res.status(200).send({
      auth: true,
      success: true,
      result: adminDetail,
      data: adminData,
      message: "Login Success",
    });
  } else {
    throw new AppError("Admin not found!");
  }
});

//! ============================================= List Dashboard =============================================

export const listDashboard = asyncHandler(async (req, res) => {
  const feedbackCount = await Feedback.countDocuments();
  const totalMembersCount = await User.countDocuments();
  const data = {
    feedbackCount,
    totalMembersCount,
  };
  res.status(200).json({
    message: "Dashboard Fetched",
    success: true,
    data: data,
  });
});

//! ================================================ List User ================================================

export const listUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    message: "Users Fetched",
    success: true,
    data: users,
  });
});

//! =============================================== Block User ===============================================

export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { isActive: false },
    { new: true }
  );
  if (!user) {
    throw new AppError("User not found!");
  }
  res.status(200).json({
    message: "User Blocked",
    success: true,
    user,
  });
});

//! ============================================== Unblock User ==============================================

export const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { isActive: true },
    { new: true }
  );
  if (!user) {
    throw new AppError("User not found!");
  }
  res.status(200).json({
    message: "User Unblocked",
    success: true,
    user,
  });
});

//! ============================================== List Feedback ==============================================

export const listFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({});
  res.status(200).json({
    message: "Feedback Fetched",
    success: true,
    data: feedback,
  });
});

//! ============================================== Update About ==============================================

export const updateAbout = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    image,
    resume,
    phone,
    address,
    contact,
    education,
    skill,
  } = req.body;
  const adminId = req.params.adminId;
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new AppError("Admin not found!");
  }
  admin.name = name;
  admin.email = email;
  admin.phone = phone;
  admin.image = image;
  admin.resume = resume;
  admin.address = address;
  admin.contact = contact;
  admin.education = education;
  admin.skill = skill;
  const updatedAdmin = await admin.save();
  return res.status(200).send({
    success: true,
    data: updatedAdmin,
    message: "Update Success",
  });
});
