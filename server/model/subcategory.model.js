import mongoose from "mongoose";
import slugify from "slugify";

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: String,
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

subcategorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
