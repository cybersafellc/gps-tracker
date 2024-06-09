import supertest from "supertest";
import { logger } from "../server/app/logging.js";
import {
  createTestUser,
  deletedTracking,
  deleteTestUser,
} from "./test-utils.js";
import { web } from "../server/app/web.js";
import Jwt from "jsonwebtoken";

describe("POST:/api/users", () => {
  beforeEach(async () => {
    await deleteTestUser();
  });

  afterEach(async () => {
    await deleteTestUser();
  });

  it("normaly login", async () => {
    // create normal
    const responses = await supertest(web).post("/api/users").send({
      username: "testing",
      password: "rahasia",
      name: "testing",
      email: "testing@gmail.com",
      phone: "080808080808",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
    expect(responses.body.data.username).toBeDefined();
    expect(responses.body.data.name).toBeDefined();
  });

  it("username already exist", async () => {
    // create first
    const createRes = await supertest(web).post("/api/users").send({
      username: "testing",
      password: "rahasia",
      name: "testing",
      email: "testing@gmail.com",
      phone: "080808080808",
    });
    expect(createRes.status).toBe(200);
    expect(createRes.body.error).toBe(false);
    // create again and error
    const responses = await supertest(web).post("/api/users").send({
      username: "testing",
      password: "rahasia",
      name: "testing",
      email: "testing@gmail.com",
      phone: "080808080808",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });

  it("invalid body input", async () => {
    // input invalid
    const responses = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });
});

describe("POST:/api/users/login", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("success login", async () => {
    const responses = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
    expect(responses.body.data.access_token).toBeDefined();
    expect(responses.body.data.refresh_token).toBeDefined();
  });

  it("username doesnot exist", async () => {
    const responses = await supertest(web).post("/api/users").send({
      username: "29jddj32ncdsjf",
      password: "rahasia",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });

  it("password incorect", async () => {
    const responses = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasiawrongpass",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });

  it("invalid body input", async () => {
    const responses = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });
});

describe("GET:/api/users/verify-token", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("access_token verified", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.access_token).toBeDefined();

    const responses = await supertest(web)
      .get("/api/users/verify-token")
      .set("authorization", `Bearer ${login.body.data.access_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
  });

  it("provided invalid access_token", async () => {
    const responses = await supertest(web)
      .get("/api/users/verify-token")
      .set("authorization", `Bearer fakeAccessToken`);
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });

  it("not provided access_token", async () => {
    const responses = await supertest(web).get("/api/users/verify-token");
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });
});

describe("GET /api/users/refresh-token", () => {
  beforeEach(async () => {
    await deleteTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("successfully get access_token", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.refresh_token).toBeDefined();

    const responses = await supertest(web)
      .get("/api/users/refresh-token")
      .set("Authorization", `Bearer ${login.body.data.refresh_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(200);
    expect(responses.body.error).toBe(false);
    expect(responses.body.data.access_token).toBeDefined();
  });

  it("testing refresh token user already deleted", async () => {
    const login = await supertest(web).post("/api/users/login").send({
      username: "testing",
      password: "rahasia",
    });
    expect(login.status).toBe(200);
    expect(login.body.error);
    expect(login.body.data.refresh_token).toBeDefined();

    const deleted = await deleteTestUser();
    expect(deleted).toBeDefined();

    const responses = await supertest(web)
      .get("/api/users/refresh-token")
      .set("Authorization", `Bearer ${login.body.data.refresh_token}`);
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });

  it("provided invalid refresh_token", async () => {
    const responses = await supertest(web)
      .get("/api/users/refresh-token")
      .set("Authorization", `Bearer invalidRefreshToken`);
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });

  it("not provided refresh_token", async () => {
    const responses = await supertest(web).get("/api/users/refresh-token");
    logger.info(responses.body);
    expect(responses.status).toBe(400);
    expect(responses.body.error).toBe(true);
  });
});
