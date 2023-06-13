const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { findUserByProperty, createUser } = require("./user");

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);
  if (user) {
    const error = new Error("User Already Exist");
    error.status = 400;
    throw error;
  }

  user = new User({ name, email, password, accountStatus });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createUser({ name, email, hash });
};

const loginService = async () => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    return res.status(400).json({ message: "Invalid credential" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credential" });
  }

  delete user._doc.password;

  const token = jwt.sign(user._doc, "secret-key", { expiresIn: "2h" });
};
