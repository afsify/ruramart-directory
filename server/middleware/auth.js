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
      throw new AppError("Not Authorized", 401);
    }
  }
  if (!token) {
    throw new AppError("No Token Attached to the Header", 401);
  }
};

export const authorize = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("You don't have permissions", 403);
    }
    next();
  };
};
