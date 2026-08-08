const express = require("express");
const passport = require("passport");

const router = express.Router();

// #swagger.tags = ['Authentication']
// #swagger.description = 'Begin Google OAuth authentication.'
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// #swagger.tags = ['Authentication']
// #swagger.description = 'Google OAuth callback.'
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    return res.redirect("/auth/status");
  }
);

// #swagger.tags = ['Authentication']
// #swagger.description = 'Check current login status.'
router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      authenticated: false,
      message: "Not logged in."
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: req.user
  });
});

// #swagger.tags = ['Authentication']
// #swagger.description = 'Log out of the application.'
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      return res.status(200).json({
        message: "Logged out successfully."
      });
    });
  });
});

router.get("/failure", (req, res) => {
  return res.status(401).json({
    authenticated: false,
    message: "Google authentication failed."
  });
});

module.exports = router;