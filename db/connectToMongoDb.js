const mongoose=require('mongoose')

const connectToMongoDB=async()=>{
    try{
await mongoose.connect(process.env.MONGODB_URI)
console.log("connected to mongodb")

    }catch(err){
        console.log("error connecting to mongodb"+err.message)
    }
}

module.exports=connectToMongoDB