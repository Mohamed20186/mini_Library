import mongoose from "mongoose";
import appConfig from "../config/config.services.js";



export const connectDB = async()=>{
    try{
       console.log('⏳ Connecting to the database...');
       await mongoose.connect(appConfig.dbUrl)
       console.log('🟢 Database connected successfully');
       
    }catch(err){
      console.error('❌ Database connection failed:', err.message);
      process.exit(1);
    }
}