const express= require("express");
const protect=require('../Middleware/authMiddleware')
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup,fetchProfile}=require('../Controller/chatControllers')
// import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();
router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
router.route('/profile').get(protect,fetchProfile)

 router.route('/group').post(protect,createGroupChat)
 router.route('/rename').put(protect,renameGroup)
 router.route('/groupremove').put(protect,removeFromGroup)
router.route('/groupadd').put(protect,addToGroup)

module.exports=router