import React from 'react'
import ShopByCategory from '../components/layouts/ShopByCategory'
import SaleIsLive from '../components/layouts/SaleIsLive'
import Hero from '../components/layouts/Hero'

const Home = () => {
  return (
    <>
      <main className="w-full">
        <Hero />
        <ShopByCategory />
        <SaleIsLive />
        {/* other sections */}
      </main>
    </>
  )
}

export default Home