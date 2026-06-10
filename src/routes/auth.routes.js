const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  signup,
  login,
  logout,
  profile,
} = require("../controllers/auth.controller");

const protect = require("../middlewares/auth");

const {
  signupValidation,
  loginValidation,
  handleValidationErrors,
} = require("../middlewares/validate");

const router = express.Router();
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many signup attempts, please try again later",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts, please try again later",
  },
});


//Signup
router.post(
  "/signup",
  signupLimiter,
  signupValidation,
  handleValidationErrors,
  signup
);


//Login
router.post(
  "/login",
  loginLimiter,
  loginValidation,
  handleValidationErrors,
  login
);


//Logout
router.post("/logout", logout);


//Profile
router.get("/profile", protect, profile);


module.exports = router;