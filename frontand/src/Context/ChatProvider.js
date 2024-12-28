import {createContext,useContext, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
export const ChatContext=createContext()



const ChatProvider=({children})=> {
 
    const [user,setUser]=useState()
    const navigate=useNavigate()
    const [prev,setPrev]=useState(true)
    const trigger=()=>{
      setPrev(!prev)
    }
   
   
    useEffect(()=>{
      
      
      const use= localStorage.getItem("userInfo")
     
      setUser(JSON.parse(use))
   
       if(!use){console.log(user);navigate('/register')}
     
      }
   ,[navigate,prev])
    
    
    
    
  return(<ChatContext.Provider value={{user,setUser,trigger}}>{children}</ChatContext.Provider>)
}


export const ChatState=()=>{
 
    return useContext(ChatContext)
}

export default ChatProvider