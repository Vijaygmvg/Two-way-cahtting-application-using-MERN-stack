

const mongoose=require('mongoose')
const connectDb=async ()=>
{
    try{
        const connect=await mongoose.connect('mongodb://0.0.0.0:27017/TwoWay')
        console.log('mongodb conneted succesfully')

    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectDb