import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
