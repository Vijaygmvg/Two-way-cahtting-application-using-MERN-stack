const jwt=require('jsonwebtoken')
const genereateToken=(id)=>{
    return jwt.sign({id},"Vijaykumar2003",{
        expiresIn:"30d",
    })

}
module.exports=genereateToken