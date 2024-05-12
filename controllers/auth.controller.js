const User=require('../models/user.model')
const bcrypt = require('bcrypt');
const generateTokenAndSetCookie = require('../utils/generateToken');

const signup=async (req,res)=>{

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

try{

    const {email,password,confirmPassword}=req.body;
     
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
  
    if(password!==confirmPassword){
    return res.status(400).json({error:"Password don't match"})
    }

    const user=await User.findOne({email})

    if(user){
        return res.status(400).json({error:"user already exist"})
    }

    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password, salt)

    const newuser=new User({
        email,
        password:hashPassword
    })

    if(newuser){
        generateTokenAndSetCookie(newuser._id,res)  //for generating token and set to the cookies
    await newuser.save()

    res.status(201).json({
        _id:newuser._id,
        email:newuser.email
    })
}else{
    res.status(400).json({error:"Invalid user data"})
}
}catch(err){
    console.log("error in signup controller", err.message)
    res.status(500).json({error:"Internal server error"})
}
}



const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        const isPasswordCorrect=await bcrypt.compare(password,user.password ||"")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid user or password"})
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            email:user.email
        })
    }catch(err){
        console.log("error in login controller", err.message)
        res.status(500).json({error:"Internal server error"})
    }
 
} 




const logout=(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"logged Out successfully"})

   }catch(err){
        console.log("error in logout controller", err.message)
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports={signup,login,logout}