const express=require('express')
const app=express()
const cors=require('cors')
const {chats}=require('./data/data.js')
const connectDb=require('./Config/db.js')
const userRoutes=require('./Routes/userRoutes.js')
const chatRoutes=require('./Routes/chatRoutes.js')
const {errorHandler,notFound}=require('./Middleware/errorModlware.js')
const messageRoutes = require("./Routes/messageRoutes.js");

PORT=5000
connectDb();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Specify the frontend URL
    methods: ['GET', 'POST','PUT'], // Specify allowed methods
    credentials: true, // If you need to include credentials (cookies, authorization headers)
  }));
app.get('/',(req,res)=>{
    res.send("hello good morning to all of you ")
})

// app.get('/api/chat',(req,res)=>{
//     console.log(chats)
//     res.json(chats)

// })
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use("/api/message", messageRoutes);


app.get('/api/chat/:id',(req,res)=>{
    const singleChat=chats.find((c)=>c._id==req.params.id)
    res.send(singleChat)
})
app.use(notFound)
app.use(errorHandler)

app.listen(5000,console.log("hello"))