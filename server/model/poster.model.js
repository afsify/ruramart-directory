import mongoose from "mongoose";

const posterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Poster = mongoose.model("Poster", posterSchema);
