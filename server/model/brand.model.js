import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    logo: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

brandSchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Brand = mongoose.model("Brand", brandSchema);
