import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Support } from "../model/support.model.js";

//! =============================================== List Support ===============================================

export const listSupport = asyncHandler(async (req, res) => {
  try {
    const support = await Support.find().populate(
      "user product assignedTo assignedBy"
    );
    res.status(200).json({
      status: true,
      message: "Supports retrieved successfully.",
      data: support,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Support ===============================================

export const getSupport = asyncHandler(async (req, res) => {
  try {
    const support = await Support.findOne({ id: req.params.id }).populate(
      "user product assignedTo assignedBy"
    );
    if (!support) {
      throw new AppError("Support not found with the given ID!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Support retrieved successfully.",
      data: support,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Support ===============================================

export const createSupport = asyncHandler(async (req, res) => {
  try {
    const newSupport = await Support.create(req.body);
    res.status(201).json({
      status: true,
      message: "Support created successfully.",
      data: newSupport,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Support ===============================================

export const updateSupport = asyncHandler(async (req, res) => {
  try {
    const support = await Support.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!support) {
      throw new AppError("Support Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Support updated successfully.",
      data: support,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Delete Support ===============================================

export const deleteSupport = asyncHandler(async (req, res) => {
  try {
    const support = await Support.findByIdAndDelete(req.params.id);
    if (!support) {
      throw new AppError("Support Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Support deleted successfully.",
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Assign Support ===============================================

export const assignSupport = asyncHandler(async (req, res) => {
  try {
    const { assignedTo, assignedBy } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { assignedTo, assignedBy },
      { new: true }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      throw new AppError("Support Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Support deleted successfully.",
      data: support,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! ============================================ Update Support Status ============================================

export const updateSupportStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      throw new AppError("Support Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: `Support status updated to ${status}.`,
      data: support,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
