import Joi from "joi";

const create = Joi.object({
  user_id: Joi.string().required(),
  device_name: Joi.string().required(),
});

const get = Joi.object({
  user_id: Joi.string().required(),
});

const getHistoryByTrackingId = Joi.object({
  user_id: Joi.string().required(),
  tracking_id: Joi.string().required(),
});

const getHistoryById = Joi.object({
  user_id: Joi.string().required(),
  id: Joi.string().required(),
});

const liveTracking = Joi.object({
  user_id: Joi.string().required(),
  tracking_id: Joi.string().required(),
});

const verifyTrackingToken = Joi.object({
  tracking_id: Joi.string().required(),
});

const deletes = Joi.object({
  user_id: Joi.string().required(),
  tracking_id: Joi.string().required(),
});

const liveCall = Joi.object({
  tracking_id: Joi.string().required(),
  lat: Joi.number().required(),
  long: Joi.number().required(),
  accuracy: Joi.number().required(),
});

export default {
  create,
  get,
  getHistoryByTrackingId,
  getHistoryById,
  liveTracking,
  verifyTrackingToken,
  deletes,
  liveCall,
};
