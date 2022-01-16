import dotenv from "dotenv";

import loader from "./loader/index.js";
import logger from "./utils/logger.js";
dotenv.config();

const port = parseInt(process.env.PORT) || 3000;

const app = loader();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`Start server at ${port}`);
  });
}

export default app;
