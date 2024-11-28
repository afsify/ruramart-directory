import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../../model/user.model.js";
import { Admin } from "../../model/admin.model.js";
import { Banner } from "../../model/banner.model.js";
import { Feedback } from "../../model/feedback.model.js";

//! =============================================== Transporter ===============================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
let otp;
function generateSixDigitOTP() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//! ================================================= Send OTP =================================================

export const sendOTP = async (req, res, next) => {
  try {
    otp = generateSixDigitOTP();
    console.log(otp);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      var mailOptions = {
        from: process.env.GMAIL_USER,
        to: req.body.email,
        subject: "🔐 Your Account Verification OTP",
        html: `
        <html><body style="font-family: Arial, sans-serif; background-color: #f7f7f7; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;"><img src=
        "https://res.cloudinary.com/cloudverse/image/upload/v1721893242/CODSIFY/codsify.png"
        alt="Company Logo" width="150" style="display: block; margin: 0 auto;"/><h2 style="color: #333;
        font-weight: bold; margin-top: 20px;">Account Verification OTP</h2><p style="color: #777;">Welcome
        to our platform! To activate your account, please use the following One-Time Password (OTP) for
        account verification:</p><h1 style="background-color: #007bff; color: #fff; font-size: 36px;
        padding: 10px; border-radius: 5px;">${otp}</h1><p style="color: #777; margin-top: 20px;">This OTP
        is valid for a single use and will expire shortly.If you did not register for an account with us,
        please disregard this message.</p><p style="color: #777;">Thank you for choosing us!</p></div>
        </body></html>
      `,
      };
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .send({ message: "Email sending failed", success: false });
        }
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        };
        res.status(200).send({
          message: "OTP has been sent",
          success: true,
          user,
        });
      });
    } else {
      res.status(200).send({ message: "Email Already Exists", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== Verify OTP ===============================================

export const verifyOTP = async (req, res, next) => {
  try {
    const inputOtp = parseInt(req.body.otp);
    if (inputOtp === otp) {
      const { name, email, password } = req.body.user;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = User({
        name: name,
        email: email,
        password: hashPassword,
      });
      await newUser.save();
      return res
        .status(200)
        .send({ message: "Registration Success", success: true });
    } else {
      return res.status(400).send({ message: "Incorrect OTP", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== Verify SignIn ==============================================

export const login = async (req, res, next) => {
  try {
    const { name, email, password, exp, image } = req.body;
    const userData = await User.findOne({ email });
    if (exp && userData === null) {
      const hashPassword = await bcrypt.hash(password, 10);
      User.create({
        name: name,
        email: email,
        password: hashPassword,
        image: image ? image : undefined,
      }).then(async () => {
        let userData = await User.findOne({ email: email });
        let token = jwt.sign(
          { id: userData._id, role: "user" },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d",
          }
        );
        res.status(200).send({
          message: "Registration Success",
          success: true,
          token,
        });
      });
    } else if (!userData) {
      return res
        .status(404)
        .send({ message: "User Not Found", success: false });
    } else if (userData.isActive === false) {
      return res
        .status(403)
        .send({ message: "User is Blocked", success: false });
    } else {
      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res
          .status(401)
          .send({ message: "Incorrect Password", success: false });
      }
      const token = jwt.sign(
        { id: userData._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res.status(200).send({ message: "Login Success", success: true, token });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================ Forgot Password ============================================

export const forgotPassword = async (req, res, next) => {
  try {
    otp = generateSixDigitOTP();
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      var mailOptions = {
        from: process.env.GMAIL_USER,
        to: req.body.email,
        subject: "🔐 Password Reset OTP",
        html: `
        <html><body style="font-family: Arial, sans-serif; background-color: #f7f7f7; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;"><img src=
        "https://res.cloudinary.com/cloudverse/image/upload/v1721893242/CODSIFY/codsify.png"
        alt="Company Logo" width="150" style="display: block; margin: 0 auto;"/><h2 style="color: #333;
        font-weight: bold; margin-top: 20px;">Password Reset OTP</h2><p style="color: #777;">You've requested
        a password reset for your account. Please use the following One-Time Password (OTP) to reset your
        password:</p><h1 style="background-color: #007bff; color: #fff; font-size: 36px; padding: 10px;
        border-radius: 5px;">${otp}</h1><p style="color: #777; margin-top: 20px;">This OTP is valid for a
        single use and will expire shortly. If you did not request a password reset, please disregard this
        message.</p><p style="color: #777;">Thank you for using our services!</p></div></body></html>
      `,
      };
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .send({ message: "Email sending failed", success: false });
        }
        res.status(200).send({
          message: "OTP has been sent",
          success: true,
          email: req.body.email,
        });
      });
    } else {
      return res
        .status(200)
        .send({ message: "Email Not Exist", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== OTP Check ===============================================

export const checkOTP = async (req, res, next) => {
  try {
    const inputOtp = parseInt(req.body.otp);
    if (inputOtp === otp) {
      res.status(200).send({
        message: "OTP Matched",
        success: true,
        email: req.body.email,
      });
    } else {
      return res.status(400).send({ message: "Incorrect OTP", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================= Reset Password =============================================

export const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { password } = req.body.data;
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({ message: "Password Updated", success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== User Info ===============================================

export const getUser = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (userData) {
      res.status(200).send({
        auth: true,
        userData,
        status: true,
      });
    } else {
      res
        .status(401)
        .json({ auth: false, success: false, message: "Session Expired" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== List Banner ===============================================

export const listBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find({ status: true });
    res.status(200).send({
      message: "Banners Fetched Successfully",
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================= Contact Message =============================================

export const contactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = Feedback({
      name: name,
      email: email,
      message: message,
    });
    await newMessage.save();
    res.status(200).send({
      message: "Message has been sent",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== View About ===============================================

export const getAbout = async (req, res, next) => {
  try {
    const admin = await Admin.findOne().select("-_id -password").limit(1);
    if (!admin) {
      return res
        .status(200)
        .send({ message: "Admin not Found", success: false });
    } else {
      return res.status(200).send({
        success: true,
        data: admin,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};
