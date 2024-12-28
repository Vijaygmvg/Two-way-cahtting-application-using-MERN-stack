import React, { useEffect ,useContext} from 'react'
import { ChatState,ChatContext } from '../Context/ChatProvider'
import { useState } from 'react';
import '../CSS/ChatPage.css'
import svg from '../Pages/profilepic.jpg'
import { Link, useNavigate} from 'react-router-dom';
import SingleChatBox from '../Components/SingleChatBox';
import axios from 'axios'
import GetSender from '../Context/GetSender';
import GroupChatBox from '../Components/GroupChatBox';



export default function ChatPage() {
  const navigate=useNavigate()
  const [fetched,setFetched]=useState(false)
  const [chats,setChats]=useState([])
   const chatStyle={
    height:"5vh",
    width:"3vw",
    borderRadius:"50%",
    float:"left"
  }
  const selectedChatStyle={
    height:"5vh",
    width:"3vw",
    borderRadius:"50%",
    float:"left",
    backgroundColor:"Orange"

  }
   
  const [filterdChats,setFilteredChats]=useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [login,setLogin]=useState(false)
    const {user,setUser,trigger}=ChatState()
    const [selectedChat,setSlectedChat]=useState({
      _id:"none",
      users:["lanfslknfa","lnsdflknfds"]
    })
    const setTheSelecedChat=(e,ch)=>{
      
     e.preventDefault()
      console.log("hello")
      
       //e.target.style.backgroundColor="Orange"
      setSlectedChat(ch)
      //alert(user.id+"  "+selectedChat.users[0]._id+"  "+selectedChat.users[1]._id)
       

     // console.log(e.taret.value)
     
     

    }
    const Search = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      
  
      // Filter chats based on the search term
      const results = searchChats(term);
      setFilteredChats(results);
      console.log(filterdChats)
    };
  
    const searchChats = (searchTerm) => {
      if (!searchTerm) return chats;
  
      const searchTermLower = searchTerm.toLowerCase();
      return chats.filter(chat => {
        const chatNameMatch = chat.chatName.toLowerCase().includes(searchTermLower);
        const userMatch = chat.users.some(user => 
          user.name.toLowerCase().includes(searchTermLower) || user.email.toLowerCase().includes(searchTermLower)
        );
        return chatNameMatch || userMatch;
      });
    };


        useEffect(()=>{
    const checking=()=>{
     console.log("useEffetct is workiong ")
     
 
     if(!user){
      console.log("not a null user")
     setLogin(false)
        
      // navigate("/register")
      
     }


    else{
      console.log(user)
      console.log("login is true")
      setLogin(true)

    
    }

      }
      checking()
    },[setUser,navigate,trigger]
   )
   useEffect(()=>{
    const checking=()=>{
     console.log("useEffetct is workiong ")
     
 
     if(!user){
      console.log("not a null user")
     setLogin(false)
        
      // navigate("/register")
      
     }


    else{
      console.log(user)
      console.log("login is true")
      setLogin(true)

    
    }

      }
      checking()
    },[setUser,navigate,trigger]
   )






   const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      setFetched(true)
      setChats(data);
      setFilteredChats(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    
    fetchChats();
    // eslint-disable-next-line
  },[navigate,setSlectedChat,user]);
  
  //   const {profile,setProfile}=useState({
  //     name:'ravi',
  //     email:'ajln',
  //     pic:'kjan',
  //     createdAt:'kajn'
  //   })
  //   const [h,seth]=useState("hello")
    
  //   useEffect(()=>{
  //     const fetchData=async ()=>{
      
  //  const use=localStorage.getItem("userInfo")
  //     console.log(use)
  //     const use2=await JSON.parse(use)
  //     console.log(use2)
  //     setUser(use2)
      

      
       
       
      
     
     
      
      
  //     // setUser({
  //     //   id:use2.id,
  //     //   name:use.name,
  //     //   email:use2.email,
  //     //   pic:use2.pic

  //     // })
  //     // setUser(use2)
  //     // console.log(user)
      
  //   //   //  fetch("http://localhost:5000/api/chat/profile",{ method: 'GET', // or 'GET', 'PUT', etc.
  //   //   //   headers: {
  //   //   //     'Content-Type': 'application/json',
  //   //   //     'Authorization': `Bearer ${token}`, // Send token in Authorization header
  //   //   //   }},).then((res)=>{
  //   //   //   return  res.json()
  //   //   //  }).then((data)=>{
  //   //   //   console.log(data)
  //   //   //  })
  //    return () => {
  //       console.log('Component unmounted or effect re-run');
  //   };
            
  //   }
  //   fetchData()
  
  // },[user])
  if (!user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
    
  return (
    <>
    {login?(<>
    <div style={{height:"8vh",backgroundColor:"red"}} >
      <div>

      </div>
      <div style={{marginLeft:"90vw",borderRadius:"50%",height:"100%"}}>
      <Link to="/profile" state={user}> <img src={user.pic}   alt='noimage ' style={{borderRadius:"50%",height:"60%",width:"60%",marginTop:"5%"}}/></Link>
       {user.name}
    
      </div>


    </div>
    <div className="chat-app">
    {/* Left Section */}
    <div className="left-section">
  
    <button className="create-group" ><Link to="/createChat">+ New chat</Link></button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => Search(e)}
        />
      </div>
      <div className="user-list">
        <h2>My Chats</h2>
        <ul>
         {filterdChats.map((i)=>{
          console.log(i)
          return(<li key={i._id}  id={i._id} className="chats" style={{"backgroundColor":(i._id==selectedChat._id)?"Orange":"white"}} onClick={(e) => setTheSelecedChat(e,i)} >
          <img src={(i.isGroupChat)?i.groupPic:((i.users[0]._id===user.id)?i.users[1].pic:i.users[0].pic)} style={{ "height":"5vh","width":"3vw","borderRadius":"50%","float":"left"}}  ></img>{(i.isGroupChat)?i.chatName:(i.users[0]._id===user.id)?i.users[1].name:i.users[0].name}<br/>{i.latestMessage?i.latestMessage.content:""}</li>)
         })}
      
        </ul>
        
      </div>
    </div>

    {/* Right Section */}
    <div className="right-section">
     { fetched&&((!selectedChat.isGroupChat)?(<SingleChatBox user={user} selectedChat={selectedChat} guestId={GetSender(user,selectedChat.users)} />):<GroupChatBox user={user} selectedChat={selectedChat} />)}
    </div>
  </div>
  </>):(<diV>hello</diV>)
}
  </>
  )
}




