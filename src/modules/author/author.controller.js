import { Router } from "express";
import { createAuthorService } from "./author.services.js";
import { response } from "../../common/utils/response.js";


export const authorRouter = Router();

authorRouter.post('/', async(req , res , next)=>{
    try{
    const author = await createAuthorService(req.body);
    return response(res,author,"Author created successfully",201)
    }catch(err){
       next(err)
    }
})