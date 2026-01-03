import React from 'react'
import HomeHeadings from '../content/HomeHeadings'
import {ViewAll}from '@/components/ui/view-all'
import CategoryTab from '../content/CategoryTab'

const ShopByCategory = () => {
  return (
    <>
    <div className='w-full px-12 '>
        <div className='flex justify-between items-center '>
            <div>
            <HomeHeadings H1="Shop" H2="By Categories"/>
            </div>
            <ViewAll/>
        </div>
        <CategoryTab/>

    </div>
    
    
    </>

  )
}

export default ShopByCategory