import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import next from "next";
import errorMiddlewares from "../middlewares/error-middleware.js";
import publicRouter from "../routes/public.js";
import privateRouter from "../routes/private.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();
export const web = express();

// app.prepare().then(() => {
web.use(cors());
web.use(cookieParser());
web.use(bodyParser.json());

web.use("/api", publicRouter);
web.use("/api", privateRouter);

web.use("/api", errorMiddlewares.apiNotfound);
web.use(errorMiddlewares.errorHandler);
//   web.all("*", (req, res) => {
//     return handler(req, res);
//   });
// });
