const express = require("express");

const membershipsController = require("../controllers/memberships");
const { isAuthenticated } = require("../middleware/auth");

const {
  membershipValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// GET all memberships - public
router.get(
  "/",
  membershipsController.getAll
);

// GET one membership - public
router.get(
  "/:id",
  membershipsController.getSingle
);

// POST membership - protected
router.post(
  "/",
  isAuthenticated,
  membershipValidationRules,
  validate,
  membershipsController.createMembership
);

// PUT membership - protected
router.put(
  "/:id",
  isAuthenticated,
  membershipValidationRules,
  validate,
  membershipsController.updateMembership
);

// DELETE membership - protected
router.delete(
  "/:id",
  isAuthenticated,
  membershipsController.deleteMembership
);

module.exports = router;