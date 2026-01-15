import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './assets/components/layouts/Navbar'
import Home from './assets/pages/Home'
import Category from './assets/pages/Category'
import Products from './assets/pages/Products'
import About from './assets/pages/About'
import Profile from './assets/pages/Profile'
const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:slug" element={<Products/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/seller/add-product" element={<AddProd/>}/> */}
    </Routes>
    </>
  )
}
export default App;