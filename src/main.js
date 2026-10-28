import { app } from "./app.js";
import appConfig from "./config/config.services.js";
import { connectDB } from "./database/connections.js";











await connectDB();

await app.listen(appConfig.port,()=>{
    console.log(`Server started successfully on port ${appConfig.port}`)
})


