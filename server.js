const express = require("express");
const connectDB = require("./db");
const model = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@example.com",
  };
  res.json(obj);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server error occured" });
});
app.post("/register", async (req, res, next) => {
  const { name, email, password, accountStatus } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    user = new User({ name, email, password, accountStatus });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();

    res.status(201).json({ message: "User Created Successfully", user });
  } catch (e) {
    next(e);
  }
});

app.post("/login", async (req, res, next) => {
  try {
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

    return res.status(200).json({ message: "Login Successfully", token });
  } catch (e) {
    next(e);
  }
});
app.get("/private", (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    token = token.split(" ")[1];
    const user = jwt.verify(token, "secret-key");
    console.log(user);
  } catch (e) {
    return res.status(400).json({ message: "Invalid Token" });
    // console.log(e);
  }

  return res.status(200).json({ message: "i am a Private Route" });
});
app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public route" });
});

connectDB(
  "mongodb+srv://attendance-app:Sk5PkYLj541twUqs@cluster0.48q4yql.mongodb.net/?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => {
      console.log("I'm listening on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
