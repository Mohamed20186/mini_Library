import { app } from "./app.js";
import appConfig from "./config/config.services.js";
import { connectDB } from "./database/connections.js";

const startServer = async () => {
  try {
    await connectDB();

    await app.listen(appConfig.port, () => {
      console.log(`Server started successfully on port ${appConfig.port}`);
    });
  } catch (err) {
     console.error('Application startup failed:', err.message);
        process.exit(1);
  }
};


startServer();