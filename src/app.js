import express from "express" 
import { globalErrorHandler } from "./common/middleware/error.middleware.js"
import { loggerMiddleware } from "./common/middleware/loggerMiddleware.js"
export const app = express()
app.use(express.json())

app.use(loggerMiddleware)

app.get("/",  (req,res,next)=>{
   res.status(200).json({
    success : true , 
    message : 'Welcome to my word'
  })
})

app.get("/test-error",(req,res,next)=>{
    next(new Error('Something went wrong!'))
})


app.use(globalErrorHandler)
