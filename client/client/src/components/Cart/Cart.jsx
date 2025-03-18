import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchCart } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semi-bold mb-4">Your Cart</h2>

      {cart && cart?.items?.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">
              total: ${cart.totalPrice.toFixed(2)}
            </h3>
            <button type="button" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
          </div>

          <Link to="/checkout">
            <button className="mt-4 w-full bg-blue-500 text-white p-3 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      ) : (
        <h2 className="text-gray-600">Your cart is Empty</h2>
      )}
    </div>
  );
};

export default Cart;
