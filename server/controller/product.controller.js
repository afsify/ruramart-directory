import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Product } from "../model/product.model.js";

//! =============================================== List Product ===============================================

export const listProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find().populate("vendor");
    res.status(200).json({
      status: true,
      message: "Products retrieved successfully.",
      data: product,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Product ===============================================

export const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "vendor"
    );
    if (!product) {
      throw new AppError("Product not found with the given slug!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Product retrieved successfully.",
      data: product,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Product ===============================================

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: true,
      message: "Product created successfully.",
      data: newProduct,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Product ===============================================

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw new AppError("Product Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Product ===============================================

export const toggleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError("Product Not Found!", 404);
    }
    product.isActive = !product.isActive;
    await product.save();
    const action = product.isActive ? "activated" : "deactivated";
    res.status(200).json({
      status: true,
      message: `Product ${action} successfully.`,
      data: product,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
