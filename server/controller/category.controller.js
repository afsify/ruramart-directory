import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Category } from "../model/category.model.js";

//! =============================================== List Category ===============================================

export const listCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      status: true,
      message: "Categories retrieved successfully.",
      data: category,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Category ===============================================

export const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      throw new AppError("Category not found with the given slug!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Category retrieved successfully.",
      data: category,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Category ===============================================

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: true,
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Category ===============================================

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      throw new AppError("Category Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Category ===============================================

export const toggleCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError("Category Not Found!", 404);
    }
    category.isActive = !category.isActive;
    await category.save();
    const action = category.isActive ? "activated" : "deactivated";
    res.status(200).json({
      status: true,
      message: `Category ${action} successfully.`,
      data: category,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
