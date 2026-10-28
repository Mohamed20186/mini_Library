import { app } from "./app.js";
import appConfig from "./config/config.services.js";

await app.listen(appConfig.port,()=>{
    console.log(`Server started successfully on port ${appConfig.port}`)
})


