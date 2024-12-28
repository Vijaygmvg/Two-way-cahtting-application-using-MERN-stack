import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks
 // Import ChatState context
 import '../CSS/GroupProfile.css'

const GroupProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedChat, user } = location.state || {}; // Access selectedChat and user from state

  const [groupMembers, setGroupMembers] = useState(selectedChat.users || []); // Group members
  const [groupName, setGroupName] = useState(selectedChat.chatName || ''); // Group name
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [searchResults, setSearchResults] = useState([]); // Users found during search
  const [isSearching, setIsSearching] = useState(false); // Track search state
  const [isEditingName, setIsEditingName] = useState(false); // Track if the name is being edited

  // Function to remove user from group
  const handleRemoveUser = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/chat/groupremove`, 
        { chatId: selectedChat._id, userId: userId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(response.data)
      setGroupMembers(response.data.users); // Update group members after removal
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  // Function to search for users to add to the group
  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);

    if (e.target.value === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/user?search=${e.target.value}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSearchResults(response.data); // Set search results
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearching(false);
    }
  };

  // Function to add a user to the group
  const handleAddUser = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/chat/groupadd`,
        { chatId: selectedChat._id, userId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(response.data)
      setGroupMembers(response.data.users); // Update group members after adding
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to save the group name change
  const handleGroupNameChange = async () => {
    if (!groupName) return; // Ensure there is a new name to update

    try {
      const response = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        { chatId: selectedChat._id, chatName: groupName },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
       console.log(response.data)
      setIsEditingName(false); // Close the edit mode
      setGroupName(response.data.chatName); // Update the group name in state
    } catch (error) {
      console.error('Error updating group name:', error);
    }
  };

  return (
    <div className="group-management-container">
      <h2>Group Management</h2>

      {/* Group Name Editing */}
      <div className="group-name-container">
        {isEditingName ? (
          <>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="group-name-input"
            />
            <button onClick={handleGroupNameChange} className="save-name-btn">
              Save
            </button>
          </>
        ) : (
          <>
            <h3>{groupName}</h3>
            {selectedChat.groupAdmin._id === user.id && (
              <button
                onClick={() => setIsEditingName(true)}
                className="edit-name-btn"
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>

      {/* Group Members List */}
      <div className="group-members">
        <h3>Group Members:</h3>
        <ul>
          {groupMembers.map((member) => (
            <li key={member._id} className="group-member">
              <img src={member.pic} alt={member.name} className="user-pic" />
              <div className="member-info">
                <p>{member.name}</p>
                <p>{member.email}</p>
              </div>
              {selectedChat.groupAdmin._id === user.id && member._id !== user.id && (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveUser(member._id)}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Search to Add Users */}
      {selectedChat.groupAdmin._id === user.id && (
        <div className="search-users">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-box"
          />
          {isSearching ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {searchResults.length > 0 ? (
                searchResults.map((searchUser) => (
                  <li key={searchUser._id} className="search-result-item">
                    <div className="search-user-info">
                      <img src={searchUser.pic} alt={searchUser.name} className="user-pic" />
                      <p>{searchUser.name}</p>
                    </div>
                    <button
                      onClick={() => handleAddUser(searchUser._id)}
                      className="add-btn"
                    >
                      Add
                    </button>
                  </li>
                ))
              ) : (
                <p>No users found</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupProfile;
