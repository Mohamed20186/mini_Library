import { config } from "dotenv";
import path from "node:path" ;

let envFilePath = path.resolve(process.cwd(),`.env.${process.env.NODE_ENV}`)

const result =  config({
    path : envFilePath
})

if(result.error){
    throw result.error
}



const appConfig =  {
 port : Number(process.env.PORT) || 3000 ,
 dbUrl : process.env.DB_URL || 'development'
}


export default appConfig ;