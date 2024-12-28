import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider'; // Import ChatContext
import '../CSS/CreateChat.css'; // Import the CSS file for styling

const CreateChat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // Store selected users for group chat
  const [isSearching, setIsSearching] = useState(false);
  const [isGroupChat, setIsGroupChat] = useState(false); // Track if we're in group chat mode
  const [groupName, setGroupName] = useState(''); // Store group name
  const [groupPic, setGroupPic] = useState(null); // Store group profile picture
  const [imagePreview, setImagePreview] = useState(null); // For image preview before upload
  const { user } = ChatState(); // Using context for the logged-in user

  // Handle search change
  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`http://localhost:5000/api/user?search=${term}`, config);
      setUsers(response.data); // Populate users with search results
      setIsSearching(false);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  // Handle selecting a user (single or group chat)
  const handleUserSelect = (user) => {
    
    if (isGroupChat) {
      if (selectedUsers.find((u) => u._id === user._id)) {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      setSelectedUsers([user]);
    }
  };

  // Handle group picture change
  const handleGroupPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const data=new FormData()
      
      data.append('file',file)
      data.append('upload_preset','chatapp')
      data.append('cloud_name','dbyihmuuo')
      
      fetch('https://api.cloudinary.com/v1_1/dbyihmuuo/image/upload',{method:'post',body:data}).then(async (res)=>{console.log('hello'); const p=await res.json();console.log(p);setGroupPic(p.url);}).catch((err)=>{
        console.log(err)
      })// Preview image before upload
      console.log(groupPic)
    }
  };
  const handleCreateSingleChat= async ()=>{
    if(selectedUsers.length<1)
    {
      alert("plzz slect user to create group ")
      return
    }
  
    

   
   
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json', 
        },
      };
      
      const response = await axios.post('http://localhost:5000/api/chat',{userId:selectedUsers[0]._id}, config);
      console.log(response)
      alert('Chat created successfully!');
      setSelectedUsers([]);
      setGroupName('');
      setGroupPic(null);
      setImagePreview(null); // Clear after successful creation
    } catch (error) {
      console.error(error);
      alert('Error creating chat.');
    }
  };


  
  // Handle creating the chat
  const handleCreateChat = async () => {
    if(!isGroupChat)
    {
      handleCreateSingleChat()
      return
    }
    if (selectedUsers.length <2|| (isGroupChat && !groupName)) {
      alert('Please select at least two user and provide a group name.');
      return;
    }

    const formData = new FormData();
    formData.append('users', JSON.stringify(selectedUsers.map((user) => user._id)));
    formData.append("kjn","kjjndskjn" )

    if (isGroupChat) {
      formData.append('name', groupName);
      if (groupPic) {
        formData.append('groupPic', groupPic); // Append image file
      }
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  console.log(formData)    

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json', 
        },
      };
      
      const response = await axios.post('http://localhost:5000/api/chat/group', formData, config);
      console.log(response)
      alert('Chat created successfully!');
      setSelectedUsers([]);
      setGroupName('');
      setGroupPic(null);
      setImagePreview(null); // Clear after successful creation
    } catch (error) {
      console.error(error);
      alert('Error creating chat.');
    }
  };

  // Toggle between single and group chat modes
  const toggleChatMode = () => {
    setIsGroupChat(!isGroupChat);
    setSelectedUsers([]); // Clear selected users when switching mode
    setGroupName(''); // Reset group name
    setGroupPic(null); // Clear group picture
    setImagePreview(null); // Clear image preview
  };

  return (
    <div className="create-chat-container">
      <div className="chat-mode-toggle">
        <button onClick={toggleChatMode} className={isGroupChat ? 'active' : ''}>
          Group Chat
        </button>
        <button onClick={toggleChatMode} className={!isGroupChat ? 'active' : ''}>
          Single Chat
        </button>
      </div>

      {isGroupChat && (
        <div className="group-info">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="group-name-input"
          />
          <div className="group-pic-input">
            <input
              type="file"
              accept="image/*"
              onChange={handleGroupPicChange}
              className="group-pic-upload"
            />
            {imagePreview && <img src={imagePreview} alt="Group Preview" className="group-pic-preview" />}
          </div>
        </div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="user-list">
        {isSearching ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className={`user-item ${selectedUsers.some((u) => u._id === user._id) ? 'selected' : ''}`}
                >
                  <img src={user.pic} alt={user.name} className="user-pic" />
                  <div className="user-info">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </div>
                  {selectedUsers.some((u) => u._id === user._id) && <span className="checkmark">✔</span>}
                </li>
              ))
            ) : (
              <p>No users found</p>
            )}
          </ul>
        )}
      </div>

      <div className="chat-creation">
        <button className="create-chat-button" onClick={handleCreateChat}>
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default CreateChat;
