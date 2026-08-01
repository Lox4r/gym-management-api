const { body, validationResult } = require("express-validator");

const memberValidationRules = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be valid.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required."),

  body("membershipType")
    .trim()
    .notEmpty()
    .withMessage("Membership type is required.")
    .isIn(["Basic", "Premium", "Annual", "Monthly"])
    .withMessage(
      "Membership type must be Basic, Premium, Annual, or Monthly."
    ),

  body("joinDate")
    .notEmpty()
    .withMessage("Join date is required.")
    .isISO8601()
    .withMessage("Join date must use YYYY-MM-DD format."),

  body("active")
    .notEmpty()
    .withMessage("Active status is required.")
    .isBoolean()
    .withMessage("Active must be true or false.")
];

const trainerValidationRules = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("specialty")
    .trim()
    .notEmpty()
    .withMessage("Specialty is required."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be valid.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required."),

  body("yearsExperience")
    .notEmpty()
    .withMessage("Years of experience is required.")
    .isInt({ min: 0, max: 70 })
    .withMessage("Years of experience must be between 0 and 70."),

  body("active")
    .notEmpty()
    .withMessage("Active status is required.")
    .isBoolean()
    .withMessage("Active must be true or false.")
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: errors.array()
    });
  }

  return next();
};

module.exports = {
  memberValidationRules,
  trainerValidationRules,
  validate
};