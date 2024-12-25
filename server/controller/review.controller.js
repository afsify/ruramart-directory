import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Review } from "../model/review.model.js";

//! =============================================== List Review ===============================================

export const listReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.find();
    res.status(200).json({
      status: true,
      message: "Reviews retrieved successfully.",
      data: review,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Review ===============================================

export const getReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findOne({ id: req.params.id });
    if (!review) {
      throw new AppError("Review not found with the given ID!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Review retrieved successfully.",
      data: review,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Review ===============================================

export const createReview = asyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: true,
      message: "Review created successfully.",
      data: newReview,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Review ===============================================

export const updateReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      throw new AppError("Review Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Review updated successfully.",
      data: review,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Toggle Review ===============================================

export const toggleReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new AppError("Review Not Found!", 404);
    }
    review.isActive = !review.isActive;
    await review.save();
    const action = review.isActive ? "activated" : "deactivated";
    res.status(200).json({
      status: true,
      message: `Review ${action} successfully.`,
      data: review,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
