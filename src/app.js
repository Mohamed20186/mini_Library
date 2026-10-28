import express from "express" 

export const app = express()

app.use(express.json())

app.get("/",  (req,res,next)=>{
   res.statusCode(200).json({
    success : true , 
    message : 'Welcome to my word'
  })
})