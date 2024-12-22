import jwt from "jsonwebtoken";
import { AppError } from "./error.js";
import { User } from "../model/user.model.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Not Authorized",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      status: false,
      message: "No Token Attached to the Header",
    });
  }
};

export const authorize = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: false,
        message: "You don't have permissions",
      });
    }
    next();
  };
};
