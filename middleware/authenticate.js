const jwt = require("jsonwebtoken");
const User = require("./models/User");





function authenticate (req, res, next) {
    let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(400).json({ message: "Unauthorized" });
    }
  } catch (e) {
    return res.status(400).json({ message: "Invalid Token" });
    // console.log(e);
  }
}

module.exports = authenticate;
