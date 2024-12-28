const jwt=require('jsonwebtoken')
const User=require('../models/userModel')


const protect= async (req, res, next) => {
    let token;
	console.log("googly")
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
	try {
		console.log(req.headers.authorization)
		
          token=req.headers.authorization.split(" ")[1]
		 console.log(token)
		 console.log("hello 1")
		
		const decoded =jwt.verify(token, "Vijaykumar2003");
		 console.log("hello 2")

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.id).select("-password");
        console.log("user founded ")

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        console.log("user founded ")

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

};

module.exports=protect
