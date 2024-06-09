import supertest from "supertest";
import { logger } from "../server/app/logging.js";
import {
  createTestUser,
  deletedTracking,
  deleteTestUser,
  historyTrackingId,
} from "./test-utils.js";
import { web } from "../server/app/web.js";
import Jwt from "jsonwebtoken";

describe("POST:/api/trackings", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("successfully created", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const responses = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "device nanda",
      });
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);

    await deletedTracking(user_id);
  }, 10000);

  it("error if already exist", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const responses1 = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "device nanda",
      });
    expect(responses1.status).toBe(200);
    expect(responses1.body.error).toBe(false);

    const responses = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "device nanda",
      });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);

    await deletedTracking(user_id);
  }, 10000);

  it("Invalid body input", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();

    const responses = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "",
      });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  }, 10000);
});

describe("GET:/api/trackings", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("successfully get", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();

    const responses = await supertest(web)
      .get("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
    expect(responses.body.data).toBeDefined();
  }, 10000);
});

describe("GET:/api/trackings/history?tracking=<tracking_id>", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("successfully get", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const post = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "device nanda",
      });
    logger.info(post.body);
    expect(post.status).toBe(200);
    expect(post.body.error).toBe(false);
    expect(post.body.data.token).toBeDefined();
    const tracking_id = Jwt.verify(
      post.body.data.token,
      process.env.TRACKING_SECRET,
      (err, decode) => {
        return decode.tracking_id;
      }
    );
    expect(tracking_id).toBeDefined();

    const fetchTrackers = await supertest(web)
      .post("/api/tracker")
      .set("Authorization", `Bearer ${post.body.data.token}`)
      .send({
        lat: 1,
        long: 1,
        accuracy: 1,
      });

    expect(fetchTrackers.status).toBe(200);
    expect(fetchTrackers.body.error).toBe(false);

    const response = await supertest(web)
      .get(`/api/trackings/history?tracking_id=${tracking_id}`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(response.body);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data[0]).toBeDefined();

    await deletedTracking(user_id);
  }, 20000);

  it("tracking_id notfound", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const response = await supertest(web)
      .get(`/api/trackings/history?tracking_id=tidakada`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(response.body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);

    await deletedTracking(user_id);
  }, 20000);

  it("invalid input", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const response = await supertest(web)
      .get(`/api/trackings/history?tracking_id`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(response.body);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);

    await deletedTracking(user_id);
  }, 20000);
});

describe("GET:/api/trackings/history?id=<history_tracking_id>", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("success get", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const post = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "device nanda",
      });
    logger.info(post.body);
    expect(post.status).toBe(200);
    expect(post.body.error).toBe(false);
    expect(post.body.data.token).toBeDefined();
    const tracking_id = Jwt.verify(
      post.body.data.token,
      process.env.TRACKING_SECRET,
      (err, decode) => {
        return decode.tracking_id;
      }
    );
    expect(tracking_id).toBeDefined();

    const fetchTrackers = await supertest(web)
      .post("/api/tracker")
      .set("Authorization", `Bearer ${post.body.data.token}`)
      .send({
        lat: 1,
        long: 1,
        accuracy: 1,
      });

    expect(fetchTrackers.status).toBe(200);
    expect(fetchTrackers.body.error).toBe(false);

    const id_history_tracking = await historyTrackingId(tracking_id);
    expect(id_history_tracking).toBeDefined();

    const responses = await supertest(web)
      .get(`/api/trackings/history?id=${id_history_tracking}`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
    expect(responses.body.data.id).toBe(id_history_tracking);

    await deletedTracking(user_id);
  }, 20000);

  it("invalid input", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const responses = await supertest(web)
      .get(`/api/trackings/history?id=invalidInput`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);

    await deletedTracking(user_id);
  }, 20000);

  it("not provided input", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const responses = await supertest(web)
      .get(`/api/trackings/history`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    expect(responses.status).toBe(404);
    expect(responses.body.error).toBe(true);

    await deletedTracking(user_id);
  }, 20000);
});

describe("GET:/api/trackings?live=<tracking_id>", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("successfully get", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const post = await supertest(web)
      .post("/api/trackings")
      .set("Authorization", `Bearer ${login.body.data.access_token}`)
      .send({
        device_name: "device nanda",
      });
    logger.info(post.body);
    expect(post.status).toBe(200);
    expect(post.body.error).toBe(false);
    expect(post.body.data.token).toBeDefined();
    const tracking_id = Jwt.verify(
      post.body.data.token,
      process.env.TRACKING_SECRET,
      (err, decode) => {
        return decode.tracking_id;
      }
    );
    expect(tracking_id).toBeDefined();

    const fetchTrackers = await supertest(web)
      .post("/api/tracker")
      .set("Authorization", `Bearer ${post.body.data.token}`)
      .send({
        lat: 1,
        long: 1,
        accuracy: 1,
      });

    expect(fetchTrackers.status).toBe(200);
    expect(fetchTrackers.body.error).toBe(false);

    const responses = await supertest(web)
      .get(`/api/trackings?live=${tracking_id}`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);

    await deletedTracking(user_id);
  }, 20000);

  it("does not exist", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const responses = await supertest(web)
      .get(`/api/trackings?live=doesnotexist`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);

    await deletedTracking(user_id);
  }, 20000);

  it("not provided", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();
    const user_id = Jwt.verify(
      login.body.data.access_token,
      process.env.USER_SECRET_ACCESS_TOKEN,
      (err, decode) => {
        return decode.id;
      }
    );
    expect(user_id).toBeDefined();

    const responses = await supertest(web)
      .get(`/api/trackings?live`)
      .set("Authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
    expect(responses.body.data).toBeDefined();

    await deletedTracking(user_id);
  });
});
