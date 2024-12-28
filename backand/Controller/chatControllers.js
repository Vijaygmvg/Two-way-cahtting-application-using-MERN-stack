//const asyncHandler=require('asyncHandler')
const Chat=require('../models/chatModel')
const User=require('../models/userModel')
const accessChat=async (req,res)=>{
    const {userId}=req.body
    console.log(userId)
    console.log(req.user._id)
    if(!userId){
       console.log("userId is not included i the body ")
       res.status(400)
    }
    var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}

        ],

    }).populate('users',"-password").populate("latestMessage")
    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email ",
    })
    if(isChat.length>0){
        res.send(isChat[0])
    }
    else{

        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }

    
    try{
    const createdChat=await Chat.create(chatData)
    const fullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password")
    res.status(200).send(fullChat)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
}
const fetchChats=async(req,res)=>{
    try{
        
        
        
    
        Chat.find({ users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1}).then(async (results)=>{
        results=await User.populate(results,{
            path:"latestMessage.sender",
            select:"name pic email ",
        }
         )
         res.status(200).send(results)
        })
    }
    catch(err){
        res.status(400)
  console.log(err)
    }
}

const createGroupChat = async (req, res) => {
   
  
    if (!req.body.users || !req.body.name) {
      console.log("creating to the groups")
      console.log(req.body)
     
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
  
    var users = JSON.parse(req.body.users);
  
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }
  
    users.push(req.user);
  
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
        groupPic:req.body.groupPic||"https://www.bing.com/images/search?view=detailV2&ccid=7sh0FF%2Bm&id=A6F8CE8F1D4C02E1F02912B71AE4D46051164A3F&thid=OIP.7sh0FF-mZTt5cobHHOKEJQHaNY&mediaurl=https%3A%2F%2Flatestforyouth.com%2Fwp-content%2Fuploads%2F2023%2F04%2Fno-dp-images-pic-photo-4239.jpg&exph=1019&expw=564&q=no+dp+images&simid=608035458730705065&form=IRPRST&ck=73D0D6414E88D98913AD762F1C811018&selectedindex=11&itb=0&cw=1237&ch=644&ajaxhist=0&ajaxserp=0&vt=0&sim=11"
      });
  
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
  const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  };
  const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  };
  const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  };
const fetchProfile= async(req,res)=>{
  res.json(req.user)


}
  

module.exports={accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup,fetchProfile}