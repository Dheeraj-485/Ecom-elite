const express = require("express");
const { isAuth } = require("../middlewares/checkAuth");
const {
  addToCart,
  fetchCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const router = express.Router();

router
  .post("/:productId", isAuth, addToCart)
  .get("/", isAuth, fetchCart)
  .put("/update/:productId/", isAuth, updateCart)
  .delete("/remove/:productId", isAuth, removeFromCart)
  .delete("/clear", isAuth, clearCart);

module.exports = router;
