import mongoose from "mongoose";

const courierSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    haulerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hauler",
    },
    delivererId: {
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
