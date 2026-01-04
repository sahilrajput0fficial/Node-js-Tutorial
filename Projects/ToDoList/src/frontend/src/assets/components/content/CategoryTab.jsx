import React from 'react'
const CategoryTab = ({_id,img , title}) => {
  return (
    <>
    <a href="/">
    <div key={_id} className='flex flex-col justify-center items-center text-center gap-2'>
      <img src={img} alt={title} className='size-20'/>
      <p className='font-semibold'>{title}</p>
    </div>
    </a>

    </>
  )
}
export default CategoryTab