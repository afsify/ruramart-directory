import asyncHandler from "express-async-handler";
import { Vendor } from "../../model/vendor.model.js";
import { AppError } from "../../middleware/error.js";

//* @desc Create a new Vendor
//* @router /api/vendor/
//* @access Private

//! =============================================== Create Vendor ===============================================

export const createVendor = asyncHandler(async (req, res) => {
  try {
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({ status: true, data: newVendor });
  } catch (error) {
    throw new AppError("Something Went Wrong!", 400);
  }
});
