import express from "express" 
import { authorRouter } from "./modules/author/author.controller.js"
import { bookRouter } from "./modules/book/book.controller.js"
import { userRouter } from "./modules/user/user.controller.js"
import { borrowRouter } from "./modules/borrow/borrow.controller.js"

export const app = express()
app.use(express.json())
app.use("/author",authorRouter)
app.use("/book",bookRouter)
app.use("/user",userRouter)
app.use("/borrow",borrowRouter)

app.get("/",  (req,res,next)=>{
   res.status(200).json({
    success : true , 
    message : 'Welcome to my word'
  })
})