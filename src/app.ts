import dotenv from "dotenv";

import loader from "./loader/index";
import logger from "./utils/logger";
dotenv.config();

const port = Number(process.env.PORT) || 3000;

const app = loader();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`Start server at ${port}`);
  });
}

export default app;
