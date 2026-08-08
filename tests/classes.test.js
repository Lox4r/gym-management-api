const express = require("express");
const request = require("supertest");

jest.mock("../db/connect", () => ({
  getDb: jest.fn()
}));

const mongodb = require("../db/connect");
const classesRoutes = require("../routes/classes");

const VALID_ID = "64b000000000000000000003";

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/classes", classesRoutes);
  return app;
};

describe("Classes GET endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /classes returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        find: () => ({
          toArray: async () => [
            {
              _id: VALID_ID,
              className: "Morning Strength"
            }
          ]
        })
      })
    });

    const response = await request(createApp()).get("/classes");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /classes/:id returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => ({
          _id: VALID_ID,
          className: "Morning Strength"
        })
      })
    });

    const response = await request(createApp()).get(
      `/classes/${VALID_ID}`
    );

    expect(response.statusCode).toBe(200);
  });

  test("GET /classes/:id returns 400 for invalid ID", async () => {
    const response = await request(createApp()).get(
      "/classes/invalid"
    );

    expect(response.statusCode).toBe(400);
  });

  test("GET /classes/:id returns 404 when not found", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => null
      })
    });

    const response = await request(createApp()).get(
      `/classes/${VALID_ID}`
    );

    expect(response.statusCode).toBe(404);
  });
});