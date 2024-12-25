import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: String,
    description: String,
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Category = mongoose.model("Category", categorySchema);
