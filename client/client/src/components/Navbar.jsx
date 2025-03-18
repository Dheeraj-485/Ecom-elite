import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
// import API from "../api"; // Axios instance
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/cartSlice";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // Fetch Cart Count
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await dispatch(fetchCart());
        console.log("cart", response.payload);

        setCartCount(response?.payload?.items?.length);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    if (isLoggedIn) fetchCarts();
  }, [isLoggedIn]);

  const navigate = useNavigate();
  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MyStore
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/cart"
                  className="relative flex items-center space-x-1 hover:text-gray-300"
                >
                  <FaShoppingCart />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 absolute -top-2 -right-3">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="flex items-center space-x-1 hover:text-gray-300"
                >
                  <FaBox />
                  <span>Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user-profile"
                  className="flex items-center space-x-1 hover:text-gray-300"
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-gray-800 p-4 space-y-4">
          <li>
            <Link to="/" className="block" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center space-x-1"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 ml-2">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="flex items-center space-x-1"
                  onClick={() => setIsOpen(false)}
                >
                  <FaBox />
                  <span>Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { FaUser, FaSignOutAlt, FaUserShield, FaBoxOpen } from "react-icons/fa";
// import { logout } from "../redux/Auth/authSlice";
// // import { logout } from "../actions/authActions"; // Assuming you have this action

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <nav className="bg-gray-800 p-4 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           Ecom Elite
//         </Link>
//         <ul className="flex space-x-4">
//           {isAuthenticated ? (
//             <>
//               {user?.isAdmin ? (
//                 <>
//                   <li>
//                     <Link to="/admin/dashboard" className="hover:text-gray-300">
//                       <FaUserShield />
//                       <span>Admin Dashboard</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/admin/orders" className="hover:text-gray-300">
//                       <FaBoxOpen />
//                       <span>Manage Orders</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/admin/products" className="hover:text-gray-300">
//                       <FaBoxOpen />
//                       <span>Manage Products</span>
//                     </Link>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <Link to="/orders" className="hover:text-gray-300">
//                       <FaBoxOpen />
//                       <span>Orders</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/user-profile"
//                       className="flex items-center space-x-1 hover:text-gray-300"
//                     >
//                       <FaUser />
//                       <span>Profile</span>
//                     </Link>
//                   </li>
//                 </>
//               )}
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="hover:text-gray-300 flex items-center space-x-1"
//                 >
//                   <FaSignOutAlt />
//                   <span>Logout</span>
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to="/login" className="hover:text-gray-300">
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/register" className="hover:text-gray-300">
//                   Register
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
