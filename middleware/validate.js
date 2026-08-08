const { body, validationResult } = require("express-validator");

// =========================
// Members
// =========================

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
    .withMessage("Email must be valid."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required."),

  body("membershipType")
    .trim()
    .notEmpty()
    .withMessage("Membership type is required."),

  body("joinDate")
    .notEmpty()
    .withMessage("Join date is required.")
    .isISO8601()
    .withMessage("Join date must be a valid date."),

  body("active")
    .isBoolean()
    .withMessage("Active must be true or false.")
];

// =========================
// Trainers
// =========================

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
    .withMessage("Email must be valid."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required."),

  body("yearsExperience")
    .isInt({ min: 0, max: 70 })
    .withMessage("Years of experience must be between 0 and 70."),

  body("active")
    .isBoolean()
    .withMessage("Active must be true or false.")
];

// =========================
// Classes
// =========================

const classValidationRules = [
  body("className")
    .trim()
    .notEmpty()
    .withMessage("Class name is required."),

  body("trainerId")
    .trim()
    .notEmpty()
    .withMessage("Trainer ID is required.")
    .isMongoId()
    .withMessage("Trainer ID must be a valid MongoDB ID."),

  body("schedule")
    .notEmpty()
    .withMessage("Schedule is required.")
    .isISO8601()
    .withMessage("Schedule must be a valid ISO date."),

  body("duration")
    .isInt({ min: 1, max: 300 })
    .withMessage("Duration must be between 1 and 300 minutes."),

  body("capacity")
    .isInt({ min: 1, max: 500 })
    .withMessage("Capacity must be between 1 and 500.")
];

// =========================
// Memberships
// =========================

const membershipValidationRules = [
  body("memberId")
    .trim()
    .notEmpty()
    .withMessage("Member ID is required.")
    .isMongoId()
    .withMessage("Member ID must be a valid MongoDB ID."),

  body("plan")
    .trim()
    .notEmpty()
    .withMessage("Plan is required."),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Start date must be valid."),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required.")
    .isISO8601()
    .withMessage("End date must be valid."),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["active", "expired", "cancelled", "pending"])
    .withMessage(
      "Status must be active, expired, cancelled, or pending."
    )
];

// =========================
// Validation Result
// =========================

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
  classValidationRules,
  membershipValidationRules,
  validate
};