import mongoose from "mongoose";
import slugify from "slugify";

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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
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
    isActive: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    subscription: subscriptionSchema,
  },
  { timestamps: true }
);

vendorSchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
