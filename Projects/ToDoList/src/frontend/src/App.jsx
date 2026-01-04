import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TopBar from './assets/components/content/TopBar'
import Navbar from './assets/components/layouts/Navbar'
import Home from './assets/pages/Home'
import Category from './assets/pages/Category'
import About from './assets/pages/About'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/about" element={<About/>}/>
    </Routes>
    </>
  )
}
export default App;