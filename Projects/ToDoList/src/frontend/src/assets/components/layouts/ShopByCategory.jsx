import {React,useEffect,useState }from 'react'
import HomeHeadings from '../content/HomeHeadings'
import {ViewAll}from '@/components/ui/view-all'
import CategoryTab from '../content/CategoryTab'
import { getCategory } from '@/assets/api/category.api'

const ShopByCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const fetchCategories = async()=>{
      const data = await getCategory();
      console.log(data);
      setCategoryData(data)
      
      return data
    }
    fetchCategories();
  }, [])
  
  
  return (
    <>
    <div className='w-full px-12 my-8'>
        <div className='flex justify-between items-center '>
            <div>
            <HomeHeadings H1="Shop" H2="By Categories"/>
            </div>
            <ViewAll/>
        </div>
        <div className="grid grid-cols-10 gap-2 my-6">
          {categoryData.map(({_id,img,title})=>{
            return(
            <CategoryTab key={_id} img={img} title={title}/>
            )

          })}

        </div>

    </div>
    
    
    </>

  )
}

export default ShopByCategory