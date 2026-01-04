import React from 'react'
import ShopByCategory from '../components/layouts/ShopByCategory'
import SaleIsLive from '../components/layouts/SaleIsLive'

const Home = () => {
  return (
    <>
  <main className="">
    <ShopByCategory />
    <SaleIsLive/>
    {/* other sections */}
  </main>
    </>
  )
}

export default Home