import http from "http";
import dotenv from "dotenv";
import { logger } from "./app/logging.js";
import { web } from "./app/web.js";
dotenv.config();

const server = http.createServer(web);
server.listen(process.env.PORT, "0.0.0.0", (e) => {
  if (e) {
    logger.error(e);
  }
  logger.info("server running on port : " + process.env.PORT);
});
