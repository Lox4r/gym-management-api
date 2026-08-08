const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

// Google OAuth callback
router.get(
  "/google/callback",

  // Prevent direct access to the callback URL
  (req, res, next) => {
    if (!req.query.code && !req.query.error) {
      return res.redirect("/auth/google");
    }

    next();
  },

  passport.authenticate("google", {
    failureRedirect: "/auth/failure"
  }),

  (req, res) => {
    return res.redirect("/auth/status");
  }
);

// Check authentication status
router.get("/status", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
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

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

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