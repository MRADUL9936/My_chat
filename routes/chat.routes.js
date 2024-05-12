const express=require("express")
const protectRoute=require("../middleware/protectRoute")
const chatMe=require("../controllers/chatMe.controller")
const router=express.Router()
router.post("/",protectRoute,chatMe)


module.exports=router;