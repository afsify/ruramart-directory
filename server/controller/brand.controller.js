import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Brand } from "../model/brand.model.js";

//! =============================================== List Brand ===============================================

export const listBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find();
    res.status(200).json({
      status: true,
      message: "Brands retrieved successfully.",
      data: brand,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Brand ===============================================

export const getBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    if (!brand) {
      throw new AppError("Brand not found with the given slug!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Brand retrieved successfully.",
      data: brand,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Brand ===============================================

export const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json({
      status: true,
      message: "Brand created successfully.",
      data: newBrand,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Brand ===============================================

export const updateBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!brand) {
      throw new AppError("Brand Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Brand updated successfully.",
      data: brand,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Brand ===============================================

export const toggleBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      throw new AppError("Brand Not Found!", 404);
    }
    brand.isActive = !brand.isActive;
    await brand.save();
    const action = brand.isActive ? "activated" : "deactivated";
    res.status(200).json({
      status: true,
      message: `Brand ${action} successfully.`,
      data: brand,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
