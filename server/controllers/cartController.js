const Cart = require("../models/Cart");
const Products = require("../models/Products");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quantity } = req.body;
    const { productId } = req.params;
    console.log("quantity", quantity);
    console.log("productId", productId);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Please login first,to access cart" });
    }
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    //check if product is already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      //if item exists update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.populate("items.product"); // Populate product details inside cart
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // cart.totalPrice = 0; // Reset before calculating
    // for (let item of cart.items) {
    //   const productData = await Products.findById(item.product); // Fetch full product details
    //   if (productData) {
    //     cart.totalPrice += item.quantity * productData.price;
    //   }
    // }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error - addToCart", error: error.message });
  }
};

exports.fetchCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "title description price thumbnail"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res
      .status(200)
      .json({ message: "Cart found successfully", cart: cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error - fetchCart", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex >= -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    await cart.populate("items.product");
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    await cart.save();
    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - updateCart", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    // cart.items = cart.items.filter(
    //   (item) => item.product.toString() !== productId
    // );
    //to populate product in cart so that we can access its price
    await cart.populate("items.product");

    // Remove from the cart

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    cart.items.splice(itemIndex, 1);

    //Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    await cart.save();

    return res.status(200).json({ message: "Cart item removed", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - removeFromCart", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findByIdAndDelete({ user: id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ message: "Cart successfully cleared", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error - clearCart", error: error.message });
  }
};
