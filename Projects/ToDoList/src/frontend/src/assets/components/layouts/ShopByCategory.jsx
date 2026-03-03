import { React, useEffect, useState } from 'react'
import HomeHeadings from '../content/HomeHeadings'
import { ViewAll } from '@/components/ui/view-all'
import CategoryTab from '../content/CategoryTab'
import { getCategory } from '@/assets/api/category.api'

const ShopByCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      setCategoryData(data)
      return data
    }
    fetchCategories();
  }, [])

  return (
    <section className='w-full max-w-9xl mx-auto px-6 lg:px-16 my-16 md:my-24'>
      <div className='flex justify-between items-end mb-10'>
        <div>
          <HomeHeadings H1="Shop" H2="By Categories" />
        </div>
        <ViewAll />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
        {categoryData?.map(({ _id, img, title }, index) => {
          return (
            <div key={_id} className={`animate-fade-in animate-stagger-${(index % 4) + 1}`}>
              <CategoryTab img={img} title={title} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ShopByCategory