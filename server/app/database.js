import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

export const database = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

database.$on("error", (e) => {
  logger.error(e);
});

database.$on("warn", (e) => {
  logger.warn(e);
});

database.$on("info", (e) => {
  logger.info(e);
});

database.$on("query", (e) => {
  logger.info(e);
});
