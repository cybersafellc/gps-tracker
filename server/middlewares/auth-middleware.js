import Jwt from "jsonwebtoken";
import { ResponseError } from "../errors/responses-error.js";

const verifyAccessToken = async (req, res, next) => {
  try {
    const access_token = await req.headers["authorization"]?.split(" ")[1];
    const decode = Jwt.verify(
      access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode;
      }
    );
    if (!decode)
      throw new ResponseError(400, "please provided valid access_token!");
    req.id = decode.id;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const refresh_token = await req.headers["authorization"]?.split(" ")[1];
    const decode = Jwt.verify(
      refresh_token,
      process.env.USER_SECRET_REFRESH_TOKEN,
      (err, decode) => {
        return decode;
      }
    );
    if (!decode)
      throw new ResponseError(400, "please provided valid refresh_token!");
    req.id = decode.id;
    next();
  } catch (error) {
    next(error);
  }
};

const trackingToken = async (req, res, next) => {
  try {
    const tracking_token = await req.headers["authorization"]?.split(" ")[1];
    const decode = Jwt.verify(
      tracking_token,
      process.env.TRACKING_SECRET,
      (err, decode) => {
        return decode;
      }
    );
    if (!decode)
      throw new ResponseError(400, "please provided valid tracking_token");
    req.tracking_id = await decode.tracking_id;
    next();
  } catch (error) {
    next(error);
  }
};

export default { verifyAccessToken, verifyRefreshToken, trackingToken };
