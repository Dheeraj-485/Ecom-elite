// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchUserOrders } from "../redux/orderSlice";

// // const OrdersPage = () => {
// //   const dispatch = useDispatch();
// //   const { orders, loading, error } = useSelector((state) => state.order);
// //   console.log("order", orders);

// //   useEffect(() => {
// //     dispatch(fetchUserOrders());
// //     // console.log("response,", response);
// //   }, [dispatch]);

// //   return (
// //     <div className="border text-2xl font-semibold p-4 m-3">
// //       <h1>Your Orders</h1>
// //       {loading && <p>Loading...</p>}
// //       {error && <p>{error}</p>}
// //       <div className="flex border ">
// //         <ul>
// //           {orders.map((order) => (
// //             <li
// //               className="border flex p-2 m-4 justify-between space-x-6 items-center mx-auto"
// //               key={order._id}
// //             >
// //               <p>Total: ${order.totalPrice}</p>
// //               <p>Status: {order.status}</p>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrdersPage;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserOrders } from "../redux/orderSlice";
// import { FaBoxOpen } from "react-icons/fa";

// const OrdersPage = () => {
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchUserOrders());
//   }, [dispatch]);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

//       {loading && <p className="text-center text-gray-600">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
//           >
//             <div className="flex items-center space-x-4">
//               <FaBoxOpen className="text-blue-500 text-2xl" />
//               <div>
//                 <p className="text-lg font-semibold">Order #{order._id}</p>
//                 <p className="text-gray-600 text-sm">
//                   Total:{" "}
//                   <span className="font-medium">${order.totalPrice}</span>
//                 </p>
//               </div>
//             </div>

//             <div className="mt-3">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Pending"
//                     ? "bg-yellow-200 text-yellow-700"
//                     : order.status === "Completed"
//                     ? "bg-green-200 text-green-700"
//                     : "bg-red-200 text-red-700"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchUserOrders } from "../redux/orderSlice";
import { FaBoxOpen, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  console.log("Orders", orders);

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            {/* Order Header */}
            <div className="flex items-center space-x-4">
              <FaBoxOpen className="text-blue-500 text-2xl" />
              <div>
                <p className="text-lg font-semibold">Order #{order._id}</p>
                <p className="text-gray-600 text-sm">
                  Total:{" "}
                  <span className="font-medium">${order.totalPrice}</span>
                </p>
              </div>
            </div>

            {/* Order Date & Payment */}
            <div className="flex items-center justify-between mt-3 text-gray-600 text-sm">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt />
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaMoneyBillWave />
                <p>{order.paymentMethod}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4">
              <h2 className="text-sm font-semibold text-gray-700">Items:</h2>
              <ul className="text-sm text-gray-600">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <span>
                      {item.product.title} × {item.quantity}
                    </span>
                    <span>${item.product.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Status */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-700"
                    : order.status === "Completed"
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Cancel Order Button */}
            {order.status === "Pending" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
