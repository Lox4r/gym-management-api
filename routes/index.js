const express = require("express");

const membersRoutes = require("./members");
const trainersRoutes = require("./trainers");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the Gym Management API",
    endpoints: {
      members: "/members",
      trainers: "/trainers",
      documentation: "/api-docs"
    }
  });
});

router.use("/members", membersRoutes);
router.use("/trainers", trainersRoutes);

module.exports = router;