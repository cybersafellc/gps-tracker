import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
  handleExceptions: true,
  handleRejections: true,
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "ERR-%DATE%.log",
      zippedArchive: true,
      maxSize: "1mb",
      maxFiles: "30d",
    }),
  ],
});
