import React from 'react'
import Cla from './circleLeftArrow'

export const ViewAll = () => {
  return (
    <>
    <div className='group cursor-pointer flex justify-center items-center font-medium text-primary '>
    <span className='group mr-1 group-hover:mr-2 transition-all'>view all</span>
    <Cla className=""/>
    </div>
    </>
  )
}
