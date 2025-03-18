import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import VerifyMail from "./pages/VerifyMail";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart/Cart";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import CreateProduct from "./pages/CreateProduct";
import UserProfile from "./pages/UserProfile";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email/:token" element={<VerifyMail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />

        {/* Product  */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path="/orders/:id" element={<OrdersPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />

        {/* Admin  */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  );
};

export default App;
