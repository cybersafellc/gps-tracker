import { database } from "../app/database.js";
import { generate } from "../app/id.js";
import { Response } from "../app/response.js";
import { ResponseError } from "../errors/responses-error.js";
import trackingValidation from "../validations/tracking-validation.js";
import validation from "../validations/validation.js";
import Jwt from "jsonwebtoken";

const create = async (request) => {
  const result = await validation(trackingValidation.create, request);
  const count = await database.tracking.count({
    where: result,
  });
  if (count) throw new ResponseError(400, "device name already exist");

  result.id = await generate.ohter_id();
  result.date = new Date();
  result.status = false;
  result.token = Jwt.sign(
    { tracking_id: result.id },
    process.env.TRACKING_SECRET
  );

  const trackingCreate = await database.tracking.create({
    data: result,
    select: {
      token: true,
    },
  });
  await database.live_tracking.create({
    data: {
      tracking_id: result.id,
      date: result.date,
      lat: 0,
      long: 0,
      accuracy: 0,
    },
  });

  return new Response(
    200,
    "successfully genereted url",
    trackingCreate,
    null,
    false
  );
};

const get = async (request) => {
  const result = await validation(trackingValidation.get, request);
  const trackings = await database.tracking.findMany({
    where: {
      user_id: result.user_id,
    },
    select: {
      id: true,
      token: true,
      date: true,
      status: true,
      device_name: true,
    },
  });
  return new Response(200, "successfully responses", trackings, null, false);
};

const getHistoryByTrackingId = async (request) => {
  const result = await validation(
    trackingValidation.getHistoryByTrackingId,
    request
  );
  const checkTrackingId = await database.tracking.count({
    where: {
      id: result.tracking_id,
      user_id: result.user_id,
    },
  });
  if (!checkTrackingId)
    throw new ResponseError(400, "tracking id does not exits");

  const historyTrackings = await database.history_tracking.findMany({
    where: {
      tracking_id: result.tracking_id,
    },
  });
  return new Response(
    200,
    "successfully responses",
    historyTrackings,
    null,
    false
  );
};

const getHistoryById = async (request) => {
  const result = await validation(trackingValidation.getHistoryById, request);
  const history = await database.history_tracking.findFirst({
    where: {
      id: result.id,
    },
  });
  if (!history) throw new ResponseError(400, "history id does not exist");
  const isValidOwner = await database.tracking.count({
    where: {
      user_id: result.user_id,
      id: history.tracking_id,
    },
  });
  if (!isValidOwner) throw new ResponseError(400, "history id does not exist");
  return new Response(200, "successfully responses", history, null, false);
};

const liveTracking = async (request) => {
  const result = await validation(trackingValidation.liveTracking, request);
  const count = await database.tracking.count({
    where: {
      id: result.tracking_id,
      user_id: result.user_id,
    },
  });
  if (!count) throw new ResponseError(400, "tracking id does not exist");

  const liveTrack = await database.live_tracking.findFirst({
    where: {
      tracking_id: result.tracking_id,
    },
  });
  return new Response(200, "successfully responses", liveTrack, null, false);
};

const verifyTrackingToken = async (request) => {
  const result = await validation(
    trackingValidation.verifyTrackingToken,
    request
  );
  const count = await database.tracking.count({
    where: {
      id: result.tracking_id,
    },
  });
  if (!count)
    throw new ResponseError(400, "please provided valid tracking_token");
  return new Response(200, "tracking_token verified", null, null, false);
};

const deletes = async (request) => {
  const result = await validation(trackingValidation.deletes, request);
  const count = await database.tracking.count({
    where: {
      id: result.tracking_id,
      user_id: result.id,
    },
  });
  if (!count) throw new ResponseError(400, "tracking id does not exist");

  await database.history_tracking.deleteMany({
    where: {
      tracking_id: result.tracking_id,
    },
  });
  await database.live_tracking.delete({
    where: {
      tracking_id: result.tracking_id,
    },
  });
  const deleteTracking = await database.tracking.delete({
    where: {
      id: result.tracking_id,
      user_id: result.user_id,
    },
    select: {
      id: true,
    },
  });
  return new Response(200, "successfully deleted", deleteTracking, null, false);
};

const liveCall = async (request) => {
  const result = await validation(trackingValidation.liveCall, request);
  const count = await database.tracking.count({
    where: {
      id: result.tracking_id,
    },
  });
  if (!count)
    throw new ResponseError(400, "please provided valid tracking_token!");
  result.date = new Date();
  await database.live_tracking.update({
    data: result,
    where: {
      tracking_id: result.tracking_id,
    },
  });
  result.id = await generate.ohter_id();
  await database.history_tracking.create({
    data: result,
  });
  return new Response(200, "success", null, null, false);
};

export default {
  liveCall,
  create,
  get,
  deletes,
  getHistoryByTrackingId,
  getHistoryById,
  liveTracking,
  verifyTrackingToken,
};
