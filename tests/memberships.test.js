const express = require("express");
const request = require("supertest");

jest.mock("../db/connect", () => ({
  getDb: jest.fn()
}));

const mongodb = require("../db/connect");
const membershipsRoutes = require("../routes/memberships");

const VALID_ID = "64b000000000000000000004";

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/memberships", membershipsRoutes);
  return app;
};

describe("Memberships GET endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /memberships returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        find: () => ({
          toArray: async () => [
            {
              _id: VALID_ID,
              plan: "Premium"
            }
          ]
        })
      })
    });

    const response = await request(createApp()).get(
      "/memberships"
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /memberships/:id returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => ({
          _id: VALID_ID,
          plan: "Premium"
        })
      })
    });

    const response = await request(createApp()).get(
      `/memberships/${VALID_ID}`
    );

    expect(response.statusCode).toBe(200);
  });

  test("GET /memberships/:id returns 400 for invalid ID", async () => {
    const response = await request(createApp()).get(
      "/memberships/invalid"
    );

    expect(response.statusCode).toBe(400);
  });

  test("GET /memberships/:id returns 404 when not found", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => null
      })
    });

    const response = await request(createApp()).get(
      `/memberships/${VALID_ID}`
    );

    expect(response.statusCode).toBe(404);
  });
});