const express = require("express");
const request = require("supertest");

jest.mock("../db/connect", () => ({
  getDb: jest.fn()
}));

const mongodb = require("../db/connect");
const trainersRoutes = require("../routes/trainers");

const VALID_ID = "64b000000000000000000002";

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/trainers", trainersRoutes);
  return app;
};

describe("Trainers GET endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /trainers returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        find: () => ({
          toArray: async () => [
            {
              _id: VALID_ID,
              firstName: "Maria"
            }
          ]
        })
      })
    });

    const response = await request(createApp()).get("/trainers");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /trainers/:id returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => ({
          _id: VALID_ID,
          firstName: "Maria"
        })
      })
    });

    const response = await request(createApp()).get(
      `/trainers/${VALID_ID}`
    );

    expect(response.statusCode).toBe(200);
  });

  test("GET /trainers/:id returns 400 for invalid ID", async () => {
    const response = await request(createApp()).get(
      "/trainers/invalid"
    );

    expect(response.statusCode).toBe(400);
  });

  test("GET /trainers/:id returns 404 when not found", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => null
      })
    });

    const response = await request(createApp()).get(
      `/trainers/${VALID_ID}`
    );

    expect(response.statusCode).toBe(404);
  });
});