const express = require("express");

const trainersController = require("../controllers/trainers");
const {
  trainerValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// #swagger.tags = ['Trainers']
// #swagger.description = 'Return all gym trainers.'
// #swagger.responses[200] = {
//   description: 'Trainers retrieved successfully.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.get("/", trainersController.getAll);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Return one gym trainer by ID.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   required: true,
//   type: 'string'
// }
// #swagger.responses[200] = {
//   description: 'Trainer retrieved successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Invalid trainer ID.'
// }
// #swagger.responses[404] = {
//   description: 'Trainer not found.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.get("/:id", trainersController.getSingle);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Create a new gym trainer.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Trainer' }
// }
// #swagger.responses[201] = {
//   description: 'Trainer created successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Validation failed.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.post(
  "/",
  trainerValidationRules,
  validate,
  trainersController.createTrainer
);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Update an existing gym trainer.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   required: true,
//   type: 'string'
// }
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Trainer' }
// }
// #swagger.responses[204] = {
//   description: 'Trainer updated successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Invalid data or ID.'
// }
// #swagger.responses[404] = {
//   description: 'Trainer not found.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.put(
  "/:id",
  trainerValidationRules,
  validate,
  trainersController.updateTrainer
);

// #swagger.tags = ['Trainers']
// #swagger.description = 'Delete a gym trainer.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   required: true,
//   type: 'string'
// }
// #swagger.responses[200] = {
//   description: 'Trainer deleted successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Invalid trainer ID.'
// }
// #swagger.responses[404] = {
//   description: 'Trainer not found.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.delete("/:id", trainersController.deleteTrainer);

module.exports = router;