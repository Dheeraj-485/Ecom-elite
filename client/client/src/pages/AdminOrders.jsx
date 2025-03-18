// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { fetchAllOrders, updateOrderStatus } from "../redux/orderSlice";

// const AdminOrders = () => {
//   const dispatch = useDispatch();
//   const { adminOrders, loading } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchAllOrders());
//   }, [dispatch]);

//   const handleStatusChange = (orderId, status) => {
//     dispatch(updateOrderStatus({ orderId, status }))
//       .unwrap()
//       .then(() => toast.success("Order status updated!"))
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <h2 className="text-2xl font-semibold mb-5">Admin Orders</h2>

//       {loading ? (
//         <p>Loading orders...</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Order ID</th>
//               <th className="border p-2">User</th>
//               <th className="border p-2">Total Price</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adminOrders &&
//               adminOrders.map((order) => (
//                 <tr key={order._id} className="text-center">
//                   <td className="border p-2">{order._id}</td>
//                   <td className="border p-2">{order.user?.email}</td>
//                   <td className="border p-2">${order.totalPrice.toFixed(2)}</td>
//                   <td className="border p-2">{order.status}</td>
//                   <td className="border p-2">
//                     <select
//                       className="border p-1 "
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order._id, e.target.value)
//                       }
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../redux/orderSlice";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { adminOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }))
      .unwrap()
      .then(() => {
        toast.success("✅ Order status updated!");

        // ✅ Instantly update the UI without refresh
        dispatch(fetchAllOrders());
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📦 Order Management
      </h2>

      {loading ? (
        <p className="text-gray-700 text-lg">Loading orders...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders &&
                adminOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="p-3 font-mono text-gray-700">{order._id}</td>
                    <td className="p-3 text-gray-800">
                      {order.user?.email || "N/A"}
                    </td>
                    <td className="p-3 font-semibold text-blue-600">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td
                      className={`p-3 font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </td>
                    <td className="p-3">
                      <select
                        className="border rounded-md p-2 text-gray-800 bg-gray-50 focus:ring focus:ring-blue-300"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">🕒 Pending</option>
                        <option value="Processing">🔄 Processing</option>
                        <option value="Shipped">🚚 Shipped</option>
                        <option value="delivered">✅ Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Helper function to style status colors
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Processing":
      return "text-blue-500";
    case "Shipped":
      return "text-purple-500";
    case "Delivered":
      return "text-green-600";
    case "Cancelled":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};

export default AdminOrders;
