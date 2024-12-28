import React, { useState,useEffect } from 'react';
import '../CSS/ChatBox.css'; // Make sure to use the updated CSS file.
import GetSender from '../Context/GetSender';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupChatBox = (props) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('');
  
  const [guest,setGuest]=useState('')
  
  const [selectedUser, setSelectedUser] = useState(); // User name for chat header
  const [selectedUserDP, setSelectedUserDP] = useState('https://via.placeholder.com/40/0077b6/ffffff?text=JD'); // User DP


  const sendMessage = async () => {
    
    if ( inputMessage) {
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
        };
       
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          {
            content: inputMessage,
            chatId: props.selectedChat,
          },
          config
        );
      
        console.log(data)
     
        setMessages([...messages, data]);
        setInputMessage("")
      } catch (error) {
        alert(error)
      }
    }

}
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user', senderDP: 'https://via.placeholder.com/40/0077b6/ffffff?text=U', time: new Date() }]);
      setInputMessage('');
    }
  };
  

  // Format time in a 12-hour format
  const formatTime = (date1) => {
    const date=new Date(date1)
    const hours = date.getHours();
    const year=date.getFullYear()
    const day=date.getDate()
    const month=date.getMonth()+1
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinute = minutes < 10 ? '0' + minutes : minutes;
    
    return `${day}/${month}/${year}     ${formattedHour}:${formattedMinute} ${ampm}`;
  };
  const fetchMessages=async ()=>{
    
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      };
      

      const { data } = await axios.get(`http://localhost:5000/api/message/${props.selectedChat._id}`, config);
      console.log(data)
      data.sort((a, b) => a.updatedAt - b.upDatedAt)
      setMessages(data)
    } catch (error) {
     alert(error)
    }
  };

  useEffect(()=>{
   
    fetchMessages()
  },[props.selectedChat])
 

  if(props.selectedChat._id=='none')
    return<div>welcome to two way chatting application</div>

    // if(messages.length<1)
    //   return <div>StartChat</div>

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        {/* Header section with user DP and name */}
        <div className="chat-header">
          <div className="user-profile">
            <Link to="/groupManagement"     state={{ selectedChat: props.selectedChat, user: props.user }}>
            <img src={props.selectedChat.groupPic} alt="User DP" className="user-dp" />
            <div className="chat-header-name">{props.selectedChat.chatName}</div>
            </Link>
          </div>
        </div>

        {/* Messages container */}
        <div className="messages-container">
        {messages.length<1?"start chat ":""}
        {props.selectedChat.groupAdmin.name} has created  this group at {props.selectedChat.createdAt}
          {messages.map((message, index) => (<>
             {message.sender._id!==props.user.id&&<div className='messagename'>{message.sender.name}</div>}
            <div key={index} className={`message ${message.sender._id === props.user.id ? 'user-message' : 'friend-message'}`}>
               
              <div className="message-profile">
                <img src={message.sender.pic} alt={`${message.sender.pic} DP`} className="message-dp" />
              </div>
              <div className="message-content">
                <span className="message-text">{message.content}</span>
                <span className="message-time">{formatTime(message.updatedAt)}</span>
              </div>
            </div>
          </>))}
        </div>

        {/* Input field and send button */}
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message"
            className="message-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatBox;
GroupChatBox.defaultProps = {
  selectedChat:{
    _id:"089u48uo8u250",
    chatName:"none",
    isGroupChat:true,
  },
  user:{
    _id:"jnsdlknldskn"
  }
,
 guestId:{
  name:"khbvkbvkj",
  email:"fjbjfn@gmail.com",
  _id:"kjbfcjnb"

 }
};