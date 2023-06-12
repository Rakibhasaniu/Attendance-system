const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res, next) => {
  const { name, email, password, accountStatus } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  registerController,
};
