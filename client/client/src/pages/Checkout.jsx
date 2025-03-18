import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.order);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleCheckout = async () => {
    if (
      !shippingAddress.fullName ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode
    ) {
      return alert("Please fill all the fields");
    }

    const orderData = {
      paymentMethod,
      shippingAddress,

      // dispatch(placeOrder({ paymentMethod, shippingAddress }));
    };

    const orderId = await dispatch(placeOrder(orderData));
    console.log("orderId user", orderId);

    if (orderId) {
      navigate(`/order-success/${orderId.payload._id}`);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
      <div className="flex flex-col space-y-2">
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          placeholder="Full Name"
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, fullName: e.target.value })
          }
          required
        />
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          placeholder="Address"
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, address: e.target.value })
          }
          required
        />
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          placeholder="City"
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, city: e.target.value })
          }
          required
        />
        <input
          className="border border-gray-300 p-2 rounded-lg w-full"
          type="text"
          placeholder="Postal Code"
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              postalCode: e.target.value,
            })
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 uppercase font-medium mb-2">
          Payment Method
        </label>
        <select
          className="border border-gray-300 p-2 rounded-lg w-full"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Cash On Delivery</option>
          <option>Credit Card</option>
          <option>UPI</option>
        </select>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CheckoutPage;
