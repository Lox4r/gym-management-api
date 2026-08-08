require("dotenv").config();

const swaggerAutogen = require("swagger-autogen")();

const host =
  process.env.SWAGGER_HOST ||
  process.env.RENDER_EXTERNAL_HOSTNAME ||
  "localhost:3000";

const isLocalhost = host.includes("localhost");

const doc = {
  info: {
    title: "Gym Management API",
    description:
      "REST API for managing gym members, trainers, classes, and memberships.",
    version: "2.0.0"
  },

  host: host,

  schemes: [
    isLocalhost ? "http" : "https"
  ],

  tags: [
    {
      name: "Members",
      description: "Gym member management"
    },
    {
      name: "Trainers",
      description: "Gym trainer management"
    },
    {
      name: "Classes",
      description: "Gym class management"
    },
    {
      name: "Memberships",
      description: "Gym membership management"
    },
    {
      name: "Authentication",
      description: "Google OAuth authentication"
    }
  ],

  definitions: {
    Member: {
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "5551234567",
      membershipType: "Premium",
      joinDate: "2026-08-08",
      active: true
    },

    Trainer: {
      firstName: "Maria",
      lastName: "Lopez",
      specialty: "Strength Training",
      email: "maria@example.com",
      phone: "5559876543",
      yearsExperience: 5,
      active: true
    },

    GymClass: {
      className: "Morning Strength",
      trainerId: "64b000000000000000000001",
      schedule: "2026-08-10T09:00:00.000Z",
      duration: 60,
      capacity: 20
    },

    Membership: {
      memberId: "64b000000000000000000002",
      plan: "Premium",
      startDate: "2026-08-08",
      endDate: "2027-08-08",
      status: "active"
    }
  }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then((result) => {
    if (!result || result.success === false) {
      console.error("Swagger documentation could not be generated.");
      process.exit(1);
    }

    console.log("Swagger documentation generated successfully.");
  })
  .catch((error) => {
    console.error("Swagger generation error:");
    console.error(error);
    process.exit(1);
  });