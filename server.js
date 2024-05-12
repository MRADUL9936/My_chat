
require('dotenv').config()
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const {app,server}=require("./socket/socket")
const PORT=process.env.PORT || 3000

const authRoute=require("./routes/auth.routes")
const messageRoute =require('./routes/message.routes')
const userRoutes=require('./routes/user.routes')
const chatRoutes=require("./routes/chat.routes")
const connectToMongoDB=require('./db/connectToMongoDb');
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoute)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)


server.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`server is running on port ${PORT}`)
})