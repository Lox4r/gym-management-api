const express = require("express");

const classesController = require("../controllers/classes");
const { isAuthenticated } = require("../middleware/auth");

const {
  classValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// GET all classes - public
router.get(
  "/",
  classesController.getAll
);

// GET one class - public
router.get(
  "/:id",
  classesController.getSingle
);

// POST class - protected
router.post(
  "/",
  isAuthenticated,
  classValidationRules,
  validate,
  classesController.createClass
);

// PUT class - protected
router.put(
  "/:id",
  isAuthenticated,
  classValidationRules,
  validate,
  classesController.updateClass
);

// DELETE class - protected
router.delete(
  "/:id",
  isAuthenticated,
  classesController.deleteClass
);

module.exports = router;