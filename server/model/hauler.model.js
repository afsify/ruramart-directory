import mongoose from "mongoose";

const haulerSchema = new mongoose.Schema(
  {
    agencyName: { type: String, required: true },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    assignedOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

export const Hauler = mongoose.model("Hauler", haulerSchema);
