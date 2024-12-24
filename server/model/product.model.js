import mongoose from "mongoose";
import slugify from "slugify";

const productVariationSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    vendorId: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [String],
    variations: [productVariationSchema],
    ratingAverage: {
      type: Number,
      default: 0,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const words = this.name.split(" ").slice(0, 4);
    this.slug = slugify(words.join(" "), { lower: true, strict: true });
  }
  next();
});

export const Product = mongoose.model("Product", productSchema);
