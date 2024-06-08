import { ResponseError } from "../errors/responses-error.js";
import { Response } from "../app/response.js";
import { logger } from "../app/logging.js";

const apiNotfound = async (req, res, next) => {
  try {
    throw new ResponseError(404, "page not found");
  } catch (error) {
    next(error);
  }
};

const errorHandler = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    const responses = new Response(err.status, err.message, null, null, true);
    res.status(responses.status).json(responses).end();
  } else {
    logger.error(err.message);
    const response = new Response(500, err.message, null, null, true);
    res.status(response.status).json(response).end();
  }
};

export default { errorHandler, apiNotfound };
