import { database } from "../server/app/database.js";
import bcrypt from "bcrypt";

export const createTestUser = async () => {
  const password = await bcrypt.hash("rahasia", 10);
  const createTestUser = await database.users.create({
    data: {
      id: "aowkoakwaowoaokwoakwokawk",
      username: "testing",
      password: password,
      name: "testing",
      email: "testing@gmail.com",
      phone: "080808080808",
    },
  });
  return createTestUser;
};

export const deleteTestUser = async () => {
  const deleteTestUser = await database.users.deleteMany({
    where: {
      username: "testing",
    },
  });
  return deleteTestUser;
};

export const deletedTracking = async (user_id) => {
  const getTracking = await database.tracking.findFirst({
    where: {
      user_id: user_id,
    },
  });
  await database.tracking.deleteMany({
    where: {
      id: getTracking?.id,
    },
  });
  await database.live_tracking.deleteMany({
    where: {
      tracking_id: getTracking?.id,
    },
  });
  await database.history_tracking.deleteMany({
    where: {
      tracking_id: getTracking?.id,
    },
  });
  return;
};

export const historyTrackingId = async (tracking_id) => {
  const id = await database.history_tracking.findFirst({
    where: {
      tracking_id: tracking_id,
    },
    select: {
      id: true,
    },
  });
  return id.id;
};
