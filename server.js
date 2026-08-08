require("dotenv").config();

const cors = require("cors");
const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger-output.json");
const mongodb = require("./db/connect");
const configurePassport = require("./config/passport");

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

configurePassport(passport);

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

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