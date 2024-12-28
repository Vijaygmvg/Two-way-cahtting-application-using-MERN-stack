import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/GetInfo.css'; // Link to the external CSS file

const GetInfo = () => {
    const location = useLocation(); // Get location object
    const { user } = location.state; // Extract user from state

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
            </div>
            <div className="profile-content">
                
                <div className="profile-pic">
                    <a href={user.pic}>
                    <img src={user.pic} alt="Profile" />
                    </a>
                </div>
               
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Password Hash:</strong> {user.passwordHash}</p>
                    <p><strong>Account Created At:</strong> {user.createdAt}</p>
                    <p><strong>Last Updated:</strong> {user.updatedAt}</p>
                </div>
            </div>
        </div>
    );
};

export default GetInfo;
