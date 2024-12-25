import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Subcategory } from "../model/subcategory.model.js";

//! =============================================== List Subcategory ===============================================

export const listSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategory = await Subcategory.find();
    res.status(200).json({
      status: true,
      message: "Subcategories retrieved successfully.",
      data: subcategory,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Subcategory ===============================================

export const getSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({ slug: req.params.slug });
    if (!subcategory) {
      throw new AppError("Subcategory not found with the given slug!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Subcategory retrieved successfully.",
      data: subcategory,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Subcategory ===============================================

export const createSubcategory = asyncHandler(async (req, res) => {
  try {
    const newSubcategory = await Subcategory.create(req.body);
    res.status(201).json({
      status: true,
      message: "Subcategory created successfully.",
      data: newSubcategory,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Subcategory ===============================================

export const updateSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!subcategory) {
      throw new AppError("Subcategory Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Subcategory updated successfully.",
      data: subcategory,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Subcategory ===============================================

export const toggleSubcategory = asyncHandler(async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      throw new AppError("Subcategory Not Found!", 404);
    }
    subcategory.isActive = !subcategory.isActive;
    await subcategory.save();
    const action = subcategory.isActive ? "activated" : "deactivated";
    res.status(200).json({
      status: true,
      message: `Subcategory ${action} successfully.`,
      data: subcategory,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
