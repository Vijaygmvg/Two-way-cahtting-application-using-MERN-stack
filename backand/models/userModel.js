const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userModel=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,requird:true},
        pic:{type:String,requird:true,default:'https://vectorified.com/images/no-profile-picture-icon-8.jpg'},

    },
    {timestamps:true}
)
userModel.pre("save",async function(next){
    if(!this.isModified){
        next()
        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
    }
})
userModel.methods.matchPassword=async function (enterdPassword){
    const result= await bcrypt.compare(enterdPassword,this.password)
    console.log('hello comparing the pasord'+result)
    
    return await bcrypt.compare(enterdPassword,this.password)

}
const User=mongoose.model("User",userModel);
module.exports=User