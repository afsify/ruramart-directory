import mongoose from "mongoose";

const courierSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    hauler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hauler",
    },
    deliverer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deliverer",
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["assigned", "in-transit", "delivered", "failed"],
      default: "assigned",
    },
    eta: { type: Date },
  },
  { timestamps: true }
);

export const Courier = mongoose.model("Courier", courierSchema);
