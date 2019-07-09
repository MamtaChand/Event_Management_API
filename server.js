 const Express = require("express")
 const app = Express()
 const handlers = require("./handlers")
 const cors = require("cors")

 //body parser stuffs
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//cors
app.use(cors());

//users
 app.get("/api/users",handlers.getUser)
 app.post("/api/users",handlers.addUser)
 app.post("/api/users/auth",handlers.authUser)
 
//events
app.get("/api/events/:userid",handlers.getEvent)
app.get("/api/events/:id",handlers.getOneEvent)
app.post("/api/events",handlers.addEvent)
app.delete("/api/events/:eventid",handlers.deleteEvent)

 const port = 6001;
 app.listen(port,()=>{
     console.log("Server is listening on "+port);
 })