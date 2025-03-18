const { sendOrderEmail } = require("../config/emailService");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  try {
    const { id } = req.user;
    const { paymentMethod, shippingAddress } = req.body;

    //Fetch user's Cart
    const cart = await Cart.findOne({ user: id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is Empty" });
    }

    //Create new order
    const newOrder = new Order({
      user: id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: cart.totalPrice,
      paymentMethod,
      shippingAddress,
      status: "Pending",
      paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
    });
    await newOrder.save();

    await Cart.findOneAndDelete({ user: id });
    console.log("User details:", req.user);
    console.log("Req.user", req.user?.email);

    const emailMessage = `<h2>Thank you for your order!</h2><p>Your order is now being processed.</p>`;
    await sendOrderEmail(req.user.email, "Order Confirmation", emailMessage);

    return res
      .status(201)
      .json({ message: "Order placed success", order: newOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - checkout", error: error.message });
  }
};

//Get all order for a login user
exports.getOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id }).populate("items.product");

    return res.status(200).json({ message: "Orders fetched", orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - Get Orders", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order found", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error- getOrderById", error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Order cannot be canceled" });
    }

    order.status = "Cancelled";
    await order.save();

    return res.status(200).json({ message: "Order Cancelled", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error- cancelOrder", error: error.message });
  }
};

//Get all orders by admin -- admin panel allows order tracking,updates and filtering

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user items.product");
    return res.status(200).json({ message: "Orders fetched", orders });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error - get all admin orders",
      error: error.message,
    });
  }
};

//Admin update Order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    //Send email update
    const emailMessage = `<h2>Your Order status has been updated!</h2><p>Order status: ${status}</p>`;
    await sendOrderEmail(req.user.email, "Order status update", emailMessage);

    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - Update order", error: error.message });
  }
};
