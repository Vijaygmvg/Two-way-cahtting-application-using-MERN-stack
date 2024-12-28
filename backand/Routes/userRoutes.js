const express=require('express')
const router=express.Router()
const protect=require('../Middleware/authMiddleware')
const {registerUser,authUser,allUsers}=require('../Controller/userontrollers')

router.post('/register',registerUser)
router.post('/login',authUser)
router.route("/").get(protect,allUsers)
router.get('/allUsers',allUsers)

module.exports=router