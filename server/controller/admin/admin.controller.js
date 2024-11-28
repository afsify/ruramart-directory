import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../model/user.model.js";
import { Admin } from "../../model/admin.model.js";
import { Feedback } from "../../model/feedback.model.js";

//! ============================================== Verify Login ==============================================

export const signIn = async (req, res, next) => {
  try {
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
        return res
          .status(400)
          .send({ message: "Incorrect Password", success: false });
      }
    } else {
      return res
        .status(400)
        .send({ message: "Incorrect Email", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== Admin Info ===============================================

export const getAdmin = async (req, res, next) => {
  try {
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
      return res
        .status(500)
        .send({ auth: false, success: false, message: "Admin Not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================= List Dashboard =============================================

export const listDashboard = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ================================================ List User ================================================

export const listUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Users Fetched",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== Block User ===============================================

export const blockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User Blocked",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== Unblock User ==============================================

export const unblockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User Unblocked",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== List Feedback ==============================================

export const listFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json({
      message: "Feedback Fetched",
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== Update About ==============================================

export const updateAbout = async (req, res, next) => {
  try {
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
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};
