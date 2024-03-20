import express from "express"
import dottenv from "dotenv"
import bodyParser from "body-parser"
import { dbConnect } from "./db/dbConnect.js"
import studentRouter from "./routers/studentRouter.js"
import userRouter from "./routers/userRouter.js"
import cors from 'cors'
import enquiryRouter from "./routers/enquiryRouter.js"
import morgan from "morgan"

const app=express()
dottenv.config()
let dburl=process.env.DBURL
let dbname=process.env.DBNAME
dbConnect(dburl)
//app.use(cors())
 const corsOptions = {
    origin: '*', // Replace with the origin(s) you want to allow
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
 };
app.use(cors(corsOptions))
app.use(morgan('tiny'))


//baseurl//


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const port =process.env.PORT


 app.use("/student",studentRouter)
 app.use("/user",userRouter)
 app.use("/enquiry",enquiryRouter)
 

app.listen(port,()=>{
    console.log(`server ${port}`)
})
