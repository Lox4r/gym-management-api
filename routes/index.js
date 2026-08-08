const express = require("express");

const authRoutes = require("./auth");
const membersRoutes = require("./members");
const trainersRoutes = require("./trainers");
const classesRoutes = require("./classes");
const membershipsRoutes = require("./memberships");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the Gym Management API",
    endpoints: {
      members: "/members",
      trainers: "/trainers",
      classes: "/classes",
      memberships: "/memberships",
      authentication: "/auth/google",
      documentation: "/api-docs"
    }
  });
});

router.use("/auth", authRoutes);
router.use("/members", membersRoutes);
router.use("/trainers", trainersRoutes);
router.use("/classes", classesRoutes);
router.use("/memberships", membershipsRoutes);

module.exports = router;