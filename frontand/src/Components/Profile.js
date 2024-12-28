import {React} from 'react';
import { useContext } from 'react';
import '../CSS/Profile.css';  // We'll add CSS for styling
import { ChatState,ChatContext } from '../Context/ChatProvider'
import { useNavigate ,useLocation} from 'react-router-dom';



// ProfileCard Component


export default function Profile() {
  // const {user,setUser}=useContext(ChatContext)
  const location=useLocation()
  const {name,pic,email}=location.state||{}
  const navigate=useNavigate()
  const back=()=>{
    navigate("/chats")
    
    

    }
    const logout=()=>{
      localStorage.removeItem("userInfo")
   
      navigate("/chats")
  }
  // if (!user) {
   
  //  navigate('/register')
  // }
  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>Student Profile</h2>
        <button className="cancel-btn" >
          <i className="fas fa-times" onClick={back}>cancel</i> {/* FontAwesome Cancel Icon */}
        </button>
      </div>

      <div className="profile-info">
      <button> <a href={pic}><img className="profile-pic" src={pic} alt="Profile" /></a></button> 
        <h3 className="name">{name}</h3>
        <p className="email">{email}</p>
      </div>

      <div className="profile-footer">
        <button className="logout-btn" onClick={logout} >Logout</button>
      </div>
    </div>
  )
}

