require("dotenv").config();

const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const mongodb = require("./db/connect");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/", require("./routes"));

app.use((req, res) => {
  return res.status(404).json({
    message: "Route not found."
  });
});

mongodb.initDb((error) => {
  if (error) {
    console.error("Database connection failed.");
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});