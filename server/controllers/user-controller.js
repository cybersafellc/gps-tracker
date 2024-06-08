import userService from "../services/user-service.js";

const create = async (req, res, next) => {
  try {
    const responses = await userService.create(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const responses = await userService.login(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

const verifyAccessToken = async (req, res, next) => {
  try {
    const responses = await userService.verifyAccessToken();
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    req.body.id = await req.id;
    const responses = await userService.refreshToken(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

export default { create, login, verifyAccessToken, refreshToken };
