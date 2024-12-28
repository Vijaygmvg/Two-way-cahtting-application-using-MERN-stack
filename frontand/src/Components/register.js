import React, { useState ,useContext} from 'react';
import '../CSS/register.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ChatState,ChatContext } from '../Context/ChatProvider'

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {user,setUser}=useContext(ChatContext)
  const [pics,setPics]=useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
    
  });
  const [processing,setProcessing]=useState(false)
  const [message,setMessage]=useState('login processing ')
  const navigate=useNavigate()

  const handleChange = (e) => {

    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const picHandle=(pic)=>{
    if(pic!=undefined){
      const data=new FormData()
      
      data.append('file',pic)
      data.append('upload_preset','chatapp')
      data.append('cloud_name','dbyihmuuo')
      fetch('https://api.cloudinary.com/v1_1/dbyihmuuo/image/upload',{method:'post',body:data}).then(async (res)=>{console.log('hello'); const p=await res.json();console.log(p);setPics(p.url);}).catch((err)=>{
        console.log(err)
      })

    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isLogin){
    if(formData.password!=formData.confirmPassword){
      console.log("plzz conform password is mimatching ")
      return;
    }
    
    try{
      const config={
        headers:{
          "Content-type":"application/json",
        }
      }
      setMessage('signup processing ')
      setProcessing(true)
      const {name,email,password}=formData
     const {data}=await axios.post("http://localhost:5000/api/user/register",{name,email,password,pics},config)
     localStorage.setItem('userInfo',JSON.stringify(data))
     console.log(data)
     setUser(data)
     setProcessing(false)
     navigate('/chats')
    }catch(error){
      console.log(error)
    }
  }
  else {
    setMessage('logining')
    setProcessing(true)
    try{
      const config={
        headers:{
          "Content-type":"application/json",
        }
      }

      const {email,password}=formData
     const {data}=await axios.post("http://localhost:5000/api/user/login",{email,password},config)
     localStorage.setItem('userInfo',JSON.stringify(data))
    
     console.log(data)
     
     setProcessing(false)
     setUser(data)

     
     navigate('/chats')
     console.log("navgated to the console")
    }catch(error){
      console.log(error)
    }

  }
    
    // Handle form submission here
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: null,
    });
  };

  return (
    <>
    
    <div>
      {processing?message:''}
    </div>
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="file"
              name="image"
              onChange={(e)=>picHandle(e.target.files[0])}
              accept="image/*"
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="toggle-button" onClick={toggleForm}>
        {isLogin ? 'Create an account' : 'Already have an account? Log in'}
      </button>
    </div>
    </>
  

   
  );
};

export default Register;
