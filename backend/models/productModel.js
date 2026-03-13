import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      trim: true
    },

    brand: {
      type: String,
      trim: true
    },

    stock: {
      type: Number,
      default: 0
    },

    images: [
      {
        type: String
      }
    ],

    averageRating: {
      type: Number,
      default: 0
    },

    totalRatings: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text" });

export const Product = mongoose.model("Product", productSchema);