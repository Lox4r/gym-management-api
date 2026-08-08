const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start Google OAuth login
router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
});

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    res.redirect("/auth/status");
  }
);

// Check authentication status
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

// Logout
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

// Authentication failure
router.get("/failure", (req, res) => {
  return res.status(401).json({
    authenticated: false,
    message: "Google authentication failed."
  });
});

module.exports = router;