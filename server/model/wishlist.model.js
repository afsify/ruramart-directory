import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listName: {
      type: String,
      default: "Shopping List",
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
