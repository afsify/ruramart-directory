import asyncHandler from "express-async-handler";
import { Vendor } from "../model/vendor.model.js";
import { AppError } from "../middleware/error.js";

//! =============================================== List Vendor ===============================================

export const listVendor = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.find().populate("userId", "-password");
    res.status(200).json({
      status: true,
      message: "Vendors retrieved successfully.",
      data: vendor,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Vendor ===============================================

export const getVendor = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ slug: req.params.slug }).populate(
      "userId",
      "-password"
    );
    if (!vendor) {
      throw new AppError("Vendor not found with the given slug!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Vendor retrieved successfully.",
      data: vendor,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Vendor ===============================================

export const createVendor = asyncHandler(async (req, res) => {
  try {
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({
      status: true,
      message: "Vendor created successfully.",
      data: newVendor,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Vendor ===============================================

export const updateVendor = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vendor) {
      throw new AppError("Vendor Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Vendor updated successfully.",
      data: vendor,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Vendor ===============================================

export const toggleVendor = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      throw new AppError("Vendor Not Found!", 404);
    }
    vendor.isActive = !vendor.isActive;
    await vendor.save();
    const action = vendor.isActive ? "activated" : "deactivated";
    res.status(200).json({
      status: true,
      message: `Vendor ${action} successfully.`,
      data: vendor,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
