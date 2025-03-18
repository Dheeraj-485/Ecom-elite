const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: { type: String },
    brand: { type: String },
    // thumbnail: { type: String, required: true },
    thumbnail: { public_id: String, url: String },
    images: [{ public_id: String, url: String }],
    stock: { type: Number, required: true, default: 0 }, // Inventory management
    ratings: { type: Number, default: 0 }, // Average rating
    numReviews: { type: Number, default: 0 }, // Total number of reviews
    variations: [
      {
        size: String, // Example: S, M, L, XL
        color: String, // Example: Red, Blue
        price: Number,
        stock: Number,
      },
    ], // For multiple product variations
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        rating: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

const Products = mongoose.model("product", productSchema);
module.exports = Products;
