const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  addReview,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.post("/create", isAuth, isAdmin, createProduct);
router.put("/update/:id", isAuth, isAdmin, updateProduct);
router.get("/:id", getProductById);
router.post("/:id/review", isAuth, addReview);

module.exports = router;
