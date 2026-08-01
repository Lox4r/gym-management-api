const express = require("express");

const membersController = require("../controllers/members");
const {
  memberValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// #swagger.tags = ['Members']
// #swagger.description = 'Return all gym members.'
// #swagger.responses[200] = {
//   description: 'Members retrieved successfully.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.get("/", membersController.getAll);

// #swagger.tags = ['Members']
// #swagger.description = 'Return one gym member by ID.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   required: true,
//   type: 'string'
// }
// #swagger.responses[200] = {
//   description: 'Member retrieved successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Invalid member ID.'
// }
// #swagger.responses[404] = {
//   description: 'Member not found.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.get("/:id", membersController.getSingle);

// #swagger.tags = ['Members']
// #swagger.description = 'Create a new gym member.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Member' }
// }
// #swagger.responses[201] = {
//   description: 'Member created successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Validation failed.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.post(
  "/",
  memberValidationRules,
  validate,
  membersController.createMember
);

// #swagger.tags = ['Members']
// #swagger.description = 'Update an existing gym member.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   required: true,
//   type: 'string'
// }
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Member' }
// }
// #swagger.responses[204] = {
//   description: 'Member updated successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Invalid data or ID.'
// }
// #swagger.responses[404] = {
//   description: 'Member not found.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.put(
  "/:id",
  memberValidationRules,
  validate,
  membersController.updateMember
);

// #swagger.tags = ['Members']
// #swagger.description = 'Delete a gym member.'
// #swagger.parameters['id'] = {
//   in: 'path',
//   required: true,
//   type: 'string'
// }
// #swagger.responses[200] = {
//   description: 'Member deleted successfully.'
// }
// #swagger.responses[400] = {
//   description: 'Invalid member ID.'
// }
// #swagger.responses[404] = {
//   description: 'Member not found.'
// }
// #swagger.responses[500] = {
//   description: 'Server error.'
// }
router.delete("/:id", membersController.deleteMember);

module.exports = router;