import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ["basic", "premium"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    shopDescription: {
      type: String,
      required: true,
    },
    shopImage: {
      type: String,
      required: true,
    },
    shopAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      country: String,
      pin: String,
    },
    contact: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    subscription: subscriptionSchema,
  },
  { timestamps: true }
);

export const Vendor = mongoose.model("Vendor", vendorSchema);
