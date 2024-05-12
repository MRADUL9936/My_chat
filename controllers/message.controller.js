const Conversation=require("../models/Conversation.model")
const Message=require("../models/message.model")
const sendMessage=async (req,res)=>{
try{
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id

   let conversation =await Conversation.findOne({
        participants:{$all :[senderId,receiverId]},
    })

    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId],
        })
    }
    const newMessage=new Message({
        senderId,
        receiverId,
        message

    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }

 ///it will run in parallel and save the conversation parallally
await Promise.all([conversation.save(),newMessage.save()])

    res.status(201).json(newMessage)


}catch(err){
    console.log("Error in sendMessage controller",err.message)
   res.status(500).json({error:"Internal server error"})
}

}

const getMessage=async(req,res)=>{

    try{
        const {id:userToChatId}=req.params
        const senderId=req.user._id
        
      const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
      }).populate("messages")

      if(!conversation) return res.status(200).json([])
        
      res.status(200).json(conversation.messages);

    }catch(err) {  console.log("Error in getmessage controller",err.message)
    res.status(500).json({error:"Internal server error"})
}
}


module.exports={sendMessage,getMessage};