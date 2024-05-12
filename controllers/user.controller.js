const User = require("../models/user.model")



const getUsers=async (req,res)=>{
    try{
    const loggedInUserId=req.user._id

    const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")

    res.status(200).json(filteredUsers)
    }catch(err){
        console.log("error in user controller",err.message)
        res.status(500).json({error:"Internal server error"})
    }
}






module.exports=getUsers