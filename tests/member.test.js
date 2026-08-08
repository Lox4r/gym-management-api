const express = require("express");
const request = require("supertest");

jest.mock("../db/connect", () => ({
  getDb: jest.fn()
}));

const mongodb = require("../db/connect");
const membersRoutes = require("../routes/members");

const VALID_ID = "64b000000000000000000001";

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/members", membersRoutes);
  return app;
};

describe("Members GET endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /members returns 200", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        find: () => ({
          toArray: async () => [
            {
              _id: VALID_ID,
              firstName: "John"
            }
          ]
        })
      })
    });

    const response = await request(createApp()).get("/members");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /members/:id returns 200 for existing member", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => ({
          _id: VALID_ID,
          firstName: "John"
        })
      })
    });

    const response = await request(createApp()).get(
      `/members/${VALID_ID}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe("John");
  });

  test("GET /members/:id returns 400 for invalid ID", async () => {
    const response = await request(createApp()).get(
      "/members/not-valid"
    );

    expect(response.statusCode).toBe(400);
  });

  test("GET /members/:id returns 404 when not found", async () => {
    mongodb.getDb.mockReturnValue({
      collection: () => ({
        findOne: async () => null
      })
    });

    const response = await request(createApp()).get(
      `/members/${VALID_ID}`
    );

    expect(response.statusCode).toBe(404);
  });
});