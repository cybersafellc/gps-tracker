import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import userController from "../controllers/user-controller.js";
import trakcingController from "../controllers/trakcing-controller.js";

const router = express.Router();
router.get(
  "/users/verify-token",
  authMiddleware.verifyAccessToken,
  userController.verifyAccessToken
);
router.get(
  "/users/refresh-token",
  authMiddleware.verifyRefreshToken,
  userController.refreshToken
);
router.post(
  "/trackings",
  authMiddleware.verifyAccessToken,
  trakcingController.create
);
router.get(
  "/trackings",
  authMiddleware.verifyAccessToken,
  trakcingController.get
);
router.get(
  "/trackings/history",
  authMiddleware.verifyAccessToken,
  trakcingController.getHistoryByTrackingId
);

router.delete(
  "/trackings",
  authMiddleware.verifyAccessToken,
  trakcingController.deletes
);

router.get(
  "/tracker/verify-token",
  authMiddleware.trackingToken,
  trakcingController.verifyTrackingToken
);

router.post(
  "/tracker",
  authMiddleware.trackingToken,
  trakcingController.liveCall
);
export default router;
