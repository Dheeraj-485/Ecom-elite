import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-700 text-lg">
        Your order ID is: <strong>{orderId}</strong>
      </p>
      <p className="text-gray-700 mt-4 text-center">
        Thank you for your purchase. Your order will be processed shortly.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
