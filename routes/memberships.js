const express = require("express");

const membershipsController = require("../controllers/memberships");
const { isAuthenticated } = require("../middleware/auth");

const {
  membershipValidationRules,
  validate
} = require("../middleware/validate");

const router = express.Router();

// #swagger.tags = ['Memberships']
// #swagger.description = 'Get all memberships.'
router.get("/", membershipsController.getAll);

// #swagger.tags = ['Memberships']
// #swagger.description = 'Get one membership by ID.'
router.get("/:id", membershipsController.getSingle);

// #swagger.tags = ['Memberships']
// #swagger.description = 'Create a membership. Authentication required.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Membership' }
// }
// #swagger.responses[401] = {
//   description: 'Authentication required.'
// }
router.post(
  "/",
  isAuthenticated,
  membershipValidationRules,
  validate,
  membershipsController.createMembership
);

// #swagger.tags = ['Memberships']
// #swagger.description = 'Update a membership. Authentication required.'
// #swagger.parameters['body'] = {
//   in: 'body',
//   required: true,
//   schema: { $ref: '#/definitions/Membership' }
// }
// #swagger.responses[401] = {
//   description: 'Authentication required.'
// }
router.put(
  "/:id",
  isAuthenticated,
  membershipValidationRules,
  validate,
  membershipsController.updateMembership
);

// #swagger.tags = ['Memberships']
// #swagger.description = 'Delete a membership. Authentication required.'
// #swagger.responses[401] = {
//   description: 'Authentication required.'
// }
router.delete(
  "/:id",
  isAuthenticated,
  membershipsController.deleteMembership
);

module.exports = router;