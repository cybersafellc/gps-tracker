import Joi from "joi";

const create = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const refreshToken = Joi.object({
  id: Joi.string().required(),
});

export default { create, login, refreshToken };
