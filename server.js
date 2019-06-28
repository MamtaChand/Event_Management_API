 const Express = require("express")
 const app = Express()
 const handlers = require("./handlers")

 //body parser stuffs
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

 app.get("/api/users",handlers.getUser)
 app.post("/api/users",handlers.addUser)
 

 const port = 3000;
 app.listen(port,()=>{
     console.log("Server is listening on "+port);
 })