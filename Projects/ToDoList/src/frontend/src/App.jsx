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

const App = () => {
  return (
    <Routes>
      {/* Routes WITH Navbar */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/products/:slug"
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />

      <Route
        path="/category"
        element={
          <MainLayout>
            <Category />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      <Route
        path="/staff"
        element={
          <MainLayout>
            <Staff />
          </MainLayout>
        }
      />

      {/* Routes WITHOUT Navbar */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
