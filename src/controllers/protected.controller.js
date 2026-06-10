const User = require("../models/User");

const welcome = async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome ${req.user.name}`,
  });
};

const accountSummary = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      memberSince: req.user.createdAt,
    },
  });
};

const adminOverview = async (req, res) => {
  const usersCount = await User.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      totalUsers: usersCount,
      message: "Admin overview",
    },
  });
};

const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    data: users,
  });
};

const deleteUser = async (req, res) => {
  const targetUserId = req.params.id;

  if (targetUserId === req.user.id) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete yourself",
    });
  }

  await User.findByIdAndDelete(targetUserId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

module.exports = {
  welcome,
  accountSummary,
  adminOverview,
  getUsers,
  deleteUser,
};