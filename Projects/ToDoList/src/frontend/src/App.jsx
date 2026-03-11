import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";

import Home from "./assets/pages/Home";
import Category from "./assets/pages/Category";
import Products from "./assets/pages/Products";
import About from "./assets/pages/About";
import Profile from "./assets/pages/Profile";
import Staff from "./assets/pages/Staff";
import Checkout from "./assets/pages/Checkout";
import Cart from "./assets/pages/Cart";
import Orders from "./assets/pages/Orders";
import NotFound from "./assets/pages/NotFound";

// New Pages
import Collection from "./assets/pages/Collection";
import Corporate from "./assets/pages/Corporate";
import Gift from "./assets/pages/Gift";
import Wishlist from "./assets/pages/Wishlist";
import OrderDetail from "./assets/pages/OrderDetail";
import Search from "./assets/pages/Search";
import PaymentSuccess from "./assets/pages/PaymentSuccess";

const App = () => {
  return (
    <Routes>
      {/* Routes WITH Navbar */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/products/:slug" element={<MainLayout><Products /></MainLayout>} />
      <Route path="/category" element={<MainLayout><Category /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/staff" element={<MainLayout><Staff /></MainLayout>} />
      <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} />
      <Route path="/orders/:id" element={<MainLayout><OrderDetail /></MainLayout>} />
      <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
      <Route path="/search" element={<MainLayout><Search /></MainLayout>} />

      {/* Collection pages (Personalisation, Trending, New Arrivals, etc.) */}
      <Route path="/collection/:slug" element={<MainLayout><Collection /></MainLayout>} />

      {/* Landing pages */}
      <Route path="/corporate" element={<MainLayout><Corporate /></MainLayout>} />
      <Route path="/gift" element={<MainLayout><Gift /></MainLayout>} />

      {/* Routes WITHOUT Navbar */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* Catch-all route for 404 Pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
