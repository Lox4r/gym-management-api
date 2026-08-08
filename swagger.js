const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Gym Management API",
    description: "API for managing gym members and trainers.",
    version: "1.0.0"
  },

  host: "gym-management-api-uk9z.onrender.com",
  schemes: ["https"],

  tags: [
    {
      name: "Members",
      description: "Endpoints for managing gym members"
    },
    {
      name: "Trainers",
      description: "Endpoints for managing gym trainers"
    }
  ],

  definitions: {
    Member: {
      firstName: "Logan",
      lastName: "Oyolo",
      email: "logan@example.com",
      phone: "+51 999 999 999",
      membershipType: "Premium",
      joinDate: "2026-08-01",
      active: true
    },

    Trainer: {
      firstName: "Maria",
      lastName: "Lopez",
      specialty: "Strength Training",
      email: "maria@example.com",
      phone: "+51 988 888 888",
      yearsExperience: 5,
      active: true
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