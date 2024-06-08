import { database } from "../app/database.js";
import { generate } from "../app/id.js";
import { Response } from "../app/response.js";
import { ResponseError } from "../errors/responses-error.js";
import userValidation from "../validations/user-validation.js";
import validation from "../validations/validation.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const create = async (request) => {
  const result = await validation(userValidation.create, request);
  const count = await database.users.count({
    where: {
      username: result.username,
    },
  });
  if (count) throw new ResponseError(400, "username already exist");
  result.password = await bcrypt.hash(result.password, 10);
  result.id = await generate.user_id();
  const resCreate = await database.users.create({
    data: result,
    select: {
      username: true,
      name: true,
    },
  });
  return new Response(200, "successfully created", resCreate, null, false);
};

const login = async (request) => {
  const result = await validation(userValidation.login, request);
  const user = await database.users.findFirst({
    where: {
      username: result.username,
    },
  });
  if (user && (await bcrypt.compare(result.password, user.password))) {
    const access_token = Jwt.sign(
      {
        id: user.id,
      },
      process.env.USER_SECRET_ACCESS_TOKEN,
      { expiresIn: "5m" }
    );
    const refresh_token = Jwt.sign(
      {
        id: user.id,
      },
      process.env.USER_SECRET_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );
    return new Response(
      200,
      "successfully login",
      {
        refresh_token,
        access_token,
      },
      null,
      false
    );
  }
  throw new ResponseError(400, "username and password not match");
};

const verifyAccessToken = async () => {
  return new Response(200, "access_token verified", null, null, false);
};

const refreshToken = async (request) => {
  const result = await validation(userValidation.refreshToken, request);
  const count = await database.users.count({
    where: {
      id: result.id,
    },
  });
  if (!count)
    throw new ResponseError(400, "please provided valid refresh_token!");
  const access_token = Jwt.sign(result, process.env.USER_SECRET_ACCESS_TOKEN, {
    expiresIn: "5m",
  });
  return new Response(
    200,
    "successfully get new access_token",
    {
      access_token,
    },
    null,
    false
  );
};

export default { create, login, verifyAccessToken, refreshToken };
