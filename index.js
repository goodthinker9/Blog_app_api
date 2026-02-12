import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js"
const app=express()

app.use(express.json())
// app.get("/test",(req,res)=>{
//     res.json("it works")
// })

app.use("/api/posts",postRoutes)
app.listen(8800,()=>{
    console.log("connected")
})