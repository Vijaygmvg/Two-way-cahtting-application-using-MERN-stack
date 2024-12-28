import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'

export default function Home() {
  const navigate=useNavigate()
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  
    if(userInfo) navigate('/chats')
      else navigate('/register')
})
  return (
    <div>
      
      this is a  one ofhomepage
    </div>
  )
}
