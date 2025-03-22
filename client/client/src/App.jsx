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
import SearchResult from "./pages/SearchResult";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className=" min-h-[80vh] flex-1">{children}</div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email/:token" element={<VerifyMail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />

        {/* Product  */}
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<CreateProduct />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResult />} />

        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path="/orders/:id" element={<OrdersPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />

        {/* Admin  */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
      {/* <Footer /> */}
    </Layout>
  );
};

export default App;
