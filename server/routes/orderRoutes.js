const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");
// const { checkout } = require("./cartRoutes");
const {
  getOrders,
  getOrderById,
  cancelOrder,
  checkout,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/checkout", isAuth, checkout);
router.get("/", isAuth, getOrders);
router.get("/:orderId", isAuth, getOrderById);
router.patch("/cancel/:orderId", isAuth, cancelOrder);

//For admin
router.get("/admin/orders", isAuth, isAdmin, getAllOrders);
router.put("/admin/orders/:orderId", isAuth, isAdmin, updateOrderStatus);

module.exports = router;
