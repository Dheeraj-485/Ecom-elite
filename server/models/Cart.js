const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //   },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //   product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
