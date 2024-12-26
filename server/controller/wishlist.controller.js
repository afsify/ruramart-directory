import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Wishlist } from "../model/wishlist.model.js";

//! =============================================== List Wishlist ===============================================

export const listWishlist = asyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.status(200).json({
      message: "Wishlists retrieved successfully.",
      success: true,
      data: wishlist,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Wishlist ===============================================

export const getWishlist = asyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ slug: req.params.slug });
    if (!wishlist) {
      throw new AppError("Wishlist not found with the given slug!", 404);
    }
    res.status(200).json({
      message: "Wishlist retrieved successfully.",
      success: true,
      data: wishlist,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Wishlist ===============================================

export const createWishlist = asyncHandler(async (req, res) => {
  try {
    const newWishlist = await Wishlist.create(req.body);
    res.status(201).json({
      message: "Wishlist created successfully.",
      success: true,
      data: newWishlist,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Wishlist ===============================================

export const updateWishlist = asyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wishlist) {
      throw new AppError("Wishlist Not Found!", 404);
    }
    res.status(200).json({
      message: "Wishlist updated successfully.",
      success: true,
      data: wishlist,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Wishlist ===============================================

export const toggleWishlist = asyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) {
      throw new AppError("Wishlist Not Found!", 404);
    }
    wishlist.isActive = !wishlist.isActive;
    await wishlist.save();
    const action = wishlist.isActive ? "activated" : "deactivated";
    res.status(200).json({
      message: `Wishlist ${action} successfully.`,
      success: true,
      data: wishlist,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
