import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  bannerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export const Banner = mongoose.model("Banner", bannerSchema);
