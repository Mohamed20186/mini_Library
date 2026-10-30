import express from "express" 
import { authorRouter } from "./modules/author/author.controller.js"

export const app = express()
app.use(express.json())
app.use("/author",authorRouter)
app.get("/",  (req,res,next)=>{
   res.status(200).json({
    success : true , 
    message : 'Welcome to my word'
  })
})