const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const generateToken=require('../Config/generateToken')
const bcrypt=require('bcryptjs')
const protect=require('../Middleware/authMiddleware')



const registerUser=asyncHandler( async (req,res)=>{
    const {name,email,password,pics}=req.body;
    //console.log(req.body)
    if(!(name||email||password))
    {
        console.log('enterd')
        res.status(400)
    
        throw new Error('please enter all the fields')
    }
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('already exist user')

    }
   const salt=await bcrypt.genSalt(10)
   const passwordb=await bcrypt.hash(password,salt)
    const user=await User.create({
        name:name,
        email:email,
        password:passwordb,
        pic:pics
    });
    if(user){
        console.log("user created succesfully ")
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('failed to crete user')
    }


}


)
const authUser=asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        const user=await User.findOne({email})
        const result=await user.matchPassword(password)
       
        if(user&&result){
           console.log("klnsldknlkdn")
            res.json({
                id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                token:generateToken(user._id)
            })

        }
        else{
            console.log(password+"  "+user.password)
            res.status(400)
            throw new Error("enter coorect username your entrerd username not foound or password is nor match ")
        }
})

// /api/user?search=vinay
const allUsers=async (req,res)=>{
  console.log("enterd to the new all users ")

    const keyWord=req.query.search
    ?{
    $or:[
        {name:{$regex:req.query.search,$options:'i'}},
        {email:{$regex:req.query.search,$options:'i'}},
    ]
}:{};
     console.log("the key word is "+keyWord)
     const users=await User.find((keyWord)).find({id:{$ne:req.user.id}})
     console.log(users)
     res.send(users)
}

module.exports={registerUser,authUser,allUsers}