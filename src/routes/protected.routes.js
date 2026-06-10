const express = require("express");

const protect = require("../middlewares/auth");
const restrictTo = require("../middlewares/role");

const {
  idValidation,
  handleValidationErrors,
} = require("../middlewares/validate");

const {
  welcome,
  accountSummary,
  adminOverview,
  getUsers,
  deleteUser,
} = require("../controllers/protected.controller");

const router = express.Router();

router.get("/me/welcome", protect, welcome);

router.get("/me/account-summary", protect, accountSummary);

router.get("/admin/overview", protect, restrictTo("admin"), adminOverview);

router.get("/admin/users", protect, restrictTo("admin"), getUsers);

router.delete(
  "/admin/users/:id",
  protect,
  restrictTo("admin"),
  idValidation,
  handleValidationErrors,
  deleteUser
);

module.exports = router;