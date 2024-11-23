import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  couponCode: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  minimumAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
