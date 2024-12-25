import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  user: {
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
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
