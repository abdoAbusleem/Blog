const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const sequelize = require("./DBConfig/DBconnection")
const userRoute = require ("./routes/user")
const postRoute = require ("./routes/post")
const relationRoute = require("./routes/relationship")
const commentRoute = require("./routes/Comment")
const {auth}    = require("./middlewares/auth") 
const serverless = require('serverless-http');

const app = express()
require("dotenv").config()



app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(morgan("tiny")) 






// //Dbconnect
 sequelize.authenticate().then(() => {
     console.log("connected")
 }).catch((e) => {
     console.log("failed", e.message)
 })



  
 //routes 
 app.use("/Users" , userRoute)
 app.use ("/posts" ,  postRoute)
 app.use("/relation" , auth , relationRoute)
 app.use("/comments" , auth , commentRoute)
 


//port

const Port = process.env.Port || 4500
app.listen(Port, () => console.log(`server is running on port ${Port}`))
exports.handler = serverless(app);
