import React from 'react'
import { useEffect } from 'react'
import { getCategory } from '@/assets/api/category.api'
const CategoryTab = () => {
  const [categoryData, setCategoryData] = useState([])
  useEffect(() => {
    const data = getCategory();
    console.log(data);
    setCategoryData(data);
  }, [])
  
  return (
    <>
    <div className='flex flex-col justify-center items-center'>
    <img src="/earbuds.webp" alt="earbuds" />
    <p>True Wireless Earbuds</p>
    </div>

    </>
  )
}
export default CategoryTab