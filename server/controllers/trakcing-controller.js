import { ResponseError } from "../errors/responses-error.js";
import trackingService from "../services/tracking-service.js";

const create = async (req, res, next) => {
  try {
    req.body.user_id = await req.id;
    const responses = await trackingService.create(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    req.body.user_id = await req.id;
    if (await req.query.live) {
      req.body.tracking_id = await req.query.live;
      const responses = await trackingService.liveTracking(req.body);
      res.status(responses.status).json(responses).end();
    } else {
      const responses = await trackingService.get(req.body);
      res.status(responses.status).json(responses).end();
    }
  } catch (error) {
    next(error);
  }
};

const getHistoryByTrackingId = async (req, res, next) => {
  try {
    req.body.user_id = await req.id;
    if (await req.query.id) {
      req.body.id = await req.query.id;
      const responses = await trackingService.getHistoryById(req.body);
      res.status(responses.status).json(responses).end();
    } else if (await req.query.tracking_id) {
      req.body.tracking_id = await req.query.tracking_id;
      const responses = await trackingService.getHistoryByTrackingId(req.body);
      res.status(responses.status).json(responses).end();
    } else {
      throw new ResponseError(404, "page not found");
    }
  } catch (error) {
    next(error);
  }
};

const verifyTrackingToken = async (req, res, next) => {
  try {
    req.body.tracking_id = await req.tracking_id;
    const responses = await trackingService.verifyTrackingToken(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

const deletes = async (req, res, next) => {
  try {
    req.body.user_id = await req.id;
    const responses = await trackingService.deletes(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

const liveCall = async (req, res, next) => {
  try {
    req.body.tracking_id = await req.tracking_id;
    const responses = await trackingService.liveCall(req.body);
    res.status(responses.status).json(responses).end();
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  getHistoryByTrackingId,
  verifyTrackingToken,
  deletes,
  liveCall,
};
