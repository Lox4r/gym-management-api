const express = require("express");
const trainersController = require("../controllers/trainers");

const {
  trainerValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// #swagger.tags = ['Trainers']
// #swagger.description = 'Get all trainers.'
router.get("/", trainersController.getAll);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Get one trainer by ID.'
router.get("/:id", trainersController.getSingle);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Create a trainer.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Trainer' }
// }
router.post(
  "/",
  trainerValidationRules,
  validate,
  trainersController.createTrainer
);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Update a trainer.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Trainer' }
// }
router.put(
  "/:id",
  trainerValidationRules,
  validate,
  trainersController.updateTrainer
);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Delete a trainer.'
router.delete("/:id", trainersController.deleteTrainer);

module.exports = router;