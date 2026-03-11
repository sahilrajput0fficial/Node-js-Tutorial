import React from 'react'
import { useNavigate } from 'react-router-dom'
const Logo = ({ className }) => {
  const navigate = useNavigate()
  return (
    <>
      <img onClick={() => navigate("/")} className={className} src="/download.svg" alt="" />

    </>
  )
}

export default Logo