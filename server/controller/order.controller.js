import asyncHandler from "express-async-handler";
import { Order } from "../model/order.model.js";
import { AppError } from "../middleware/error.js";

//! =============================================== List Order ===============================================

export const listOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.find().populate("user items.product");
    res.status(200).json({
      status: true,
      message: "Orders retrieved successfully.",
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Get Order ===============================================

export const getOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id }).populate(
      "user items.product"
    );
    if (!order) {
      throw new AppError("Order not found with the given id!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Order retrieved successfully.",
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Create Order ===============================================

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: true,
      message: "Order created successfully.",
      data: newOrder,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Update Order ===============================================

export const updateOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      throw new AppError("Order Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Order updated successfully.",
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =============================================== Delete Order ===============================================

export const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      throw new AppError("Order Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! ============================================ Update Order Status ============================================

export const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid order status!", 400);
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      throw new AppError("Order Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: `Order status updated to ${status}.`,
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! ========================================= Handle Order Cancellation =========================================

export const handleOrderCancellation = asyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled", cancellation: { reason, createdAt: new Date() } },
      { new: true }
    );
    if (!order) {
      throw new AppError("Order Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Order cancelled successfully.",
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =========================================== Handle Order Return ===========================================

export const handleOrderReturn = asyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { cancellation: { reason, status: "pending", createdAt: new Date() } },
      { new: true }
    );
    if (!order) {
      throw new AppError("Order Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: "Order cancelled successfully.",
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//! =========================================== Handle Order Return Status ===========================================

export const handleOrderReturnStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, "return.status": "pending" },
      { "return.status": status },
      { new: true }
    );
    if (!order) {
      throw new AppError("Order Not Found!", 404);
    }
    res.status(200).json({
      status: true,
      message: `Order return status updated to ${status}.`,
      data: order,
    });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
