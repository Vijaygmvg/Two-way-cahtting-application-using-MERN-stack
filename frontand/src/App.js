
import './App.css';
import Chats from './Pages/ChatPage';
import Home from './Components/Home';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Register from './Components/register';
import Profile from './Components/Profile';
import CreateChat from './Components/CreateChat';
import GroupProfile from './Components/GroupProfile';
import GetInfo from './Components/GetInfo';

function App() {
  return (
    <div className="App">
      
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
          
          
          <Route path="/chats" element={<Chats/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/createChat" element={<CreateChat/>}/>
          <Route path="/groupManagement" element={<GroupProfile/>}/>
          <Route path="/GetInfo" element={<GetInfo/>} />
       
      </Routes>
    
    </div>
  );
}

export default App;
