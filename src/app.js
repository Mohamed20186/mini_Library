import express from "express" 
import * as middleware from "./common/middleware/index.js"
export const app = express()
app.use(express.json())

app.use(middleware.loggerMiddleware)

app.get("/",  (req,res,next)=>{
   res.status(200).json({
    success : true , 
    message : 'Welcome to my word'
  })
})

app.get("/test-error",(req,res,next)=>{
    next(new Error('Something went wrong!'))
})


app.use(middleware.globalErrorHandler)
