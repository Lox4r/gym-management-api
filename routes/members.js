const express = require("express");
const membersController = require("../controllers/members");

const {
  memberValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// #swagger.tags = ['Members']
// #swagger.description = 'Get all gym members.'
router.get("/", membersController.getAll);

// #swagger.tags = ['Members']
// #swagger.description = 'Get one member by ID.'
router.get("/:id", membersController.getSingle);

// #swagger.tags = ['Members']
// #swagger.description = 'Create a member.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Member' }
// }
router.post(
  "/",
  memberValidationRules,
  validate,
  membersController.createMember
);

// #swagger.tags = ['Members']
// #swagger.description = 'Update a member.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Member' }
// }
router.put(
  "/:id",
  memberValidationRules,
  validate,
  membersController.updateMember
);

// #swagger.tags = ['Members']
// #swagger.description = 'Delete a member.'
router.delete("/:id", membersController.deleteMember);

module.exports = router; 