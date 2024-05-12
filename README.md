This is simple chat application with authentication using email and password , LLM integration , mogodb database ,JWT verificaion and socket.io for real time messaging

i have created different routes for interacting with the application , i have not created any frontend so we need to interact with the application using "postman"

How to use the app ;

run the app with "npm start" or "node server.js"

these are the different routes that i have created for interaction , i will explain one by one
1.app.use("/api/auth",authRoute)
2.app.use("/api/messages",messageRoute)
3.app.use("/api/users",userRoutes)
4.app.use("/api/chat",chatRoutes)

1 (/api/auth)-> this is the auth route for authentication , it is having 3 routes , /signup , /login, /logout
   /signup -> this is the route where u need to enter your email and password after verifying the email and if the user already not exist user will be able to signup
   /login  -> if user has succesfully signup user will be able to login and chat will others
   /logout -> user can logout using this route
  

2. (/api/messages) -> it is for using the application , when u go to this route it also verify the user with JWT , it is having 2 routes
   /send/:id -> in this route user can send messages using the id of the receiver to which user is sending the message
   /:id      -> receiver receives the messages with the sender id

3. (/api/users) -> it is the routes where users get the list of other user it is having only one route and calls the function for getting all the users

4. (/api/chat) -> it is for LLM integration using gemini , if user is busy , this route can be used for chating with a chatbot .

this is a breif description of the application , Thank you 

            
