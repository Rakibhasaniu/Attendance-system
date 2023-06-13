const User = require("../models/User");

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findById({ [key]: value });
};

const createUser = ({ name, email, password }) => {};

module.exports = {
  findUserByProperty,
};
