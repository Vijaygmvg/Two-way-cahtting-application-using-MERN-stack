const notFound=(req,res,next)=>{
    const error=new Error(`NotFound-${req.originalUrl}`)
    res.status(404)
    next(error)
}
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.status==200?500:res.statusCode;
    res.status(statusCode)
    res.json({
        message:err.message,

    })
}
module.exports={notFound,errorHandler}