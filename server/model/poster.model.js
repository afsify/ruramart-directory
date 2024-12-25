import mongoose from "mongoose";

const posterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Poster = mongoose.model("Poster", posterSchema);
