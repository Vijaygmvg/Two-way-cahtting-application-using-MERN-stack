import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Chats() {
  const [chats,setChats]=useState([])
  const fetchChats=async ()=>{
  //    fetch('http://localhost:5000/api/chat', {
  //     method: 'GET',
  //     credentials: 'include', // Include credentials if needed
  //   }).then(async (data)=>{
  //     // const p=await data.json()
  //     const chats=await data.json()
  //     console.log(chats.chats)

  //   }).catch((err)=>console.log(err))
  const data=await axios.get('http://localhost:5000/api/chat')
  
  console.log(data.data)
  setChats(data.data.chats)
    
  }
  useEffect(
    ()=>{
      fetchChats()
    },[]
  )
 
  return (
    <div>
      this is a one of chats 
      <button onClick={fetchChats}>chats</button>
      <div>
        {chats.map((one)=>(
          <div key={one._id}>
            {one.chatName}
            </div>
        ))}
      </div>
    </div>
  )
}
