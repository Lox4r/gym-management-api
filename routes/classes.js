const express = require("express");
const classesController = require("../controllers/classes");

const { isAuthenticated } = require("../middleware/auth");

const {
  classValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// #swagger.tags = ['Classes']
// #swagger.description = 'Get all gym classes.'
router.get("/", classesController.getAll);

// #swagger.tags = ['Classes']
// #swagger.description = 'Get one gym class by ID.'
router.get("/:id", classesController.getSingle);

// #swagger.tags = ['Classes']
// #swagger.description = 'Create a gym class. Authentication required.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/GymClass' }
// }
// #swagger.responses[401] = { description: 'Authentication required.' }
router.post(
  "/",
  isAuthenticated,
  classValidationRules,
  validate,
  classesController.createClass
);

// #swagger.tags = ['Classes']
// #swagger.description = 'Update a gym class. Authentication required.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/GymClass' }
// }
// #swagger.responses[401] = { description: 'Authentication required.' }
router.put(
  "/:id",
  isAuthenticated,
  classValidationRules,
  validate,
  classesController.updateClass
);

// #swagger.tags = ['Classes']
// #swagger.description = 'Delete a gym class. Authentication required.'
// #swagger.responses[401] = { description: 'Authentication required.' }
router.delete(
  "/:id",
  isAuthenticated,
  classesController.deleteClass
);

module.exports = router;