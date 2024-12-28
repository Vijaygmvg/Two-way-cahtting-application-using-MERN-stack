const asyncHandler = require("express-async-handler");
const Message=require('../models/messageModel')
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
    
  try {
    console.log(req.params.chatId)
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
   
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    console.log("new messgae is creating ")
    var message = await Message.create(newMessage);
    console.log("new message is created "+message)

    // message = await message.populate("sender","name pic").execPopulate();
    // console.log( "sender is populated "+message)
    // message = await message.populate("chat").execPopulate();
    // console.log("chat is populated "+message)
    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "name pic email",
    // });
    //  console.log("user is populated "+message)
    // console.log(message)
    message = await Message.findById(message._id)
    .populate("sender", "name pic")
    .populate("chat")
    .populate({
      path: "chat.users",
      select: "name pic email",
    })
    .exec();

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    console.log(message)

    res.json(message);
  } catch (error) {
    res.status(400);
   
  }
});

module.exports = { allMessages, sendMessage };
