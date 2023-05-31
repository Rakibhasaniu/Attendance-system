const express = require("express");
const connectDB = require("./db");
const model = require("./models/User");
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
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User Already Exist" });
  }

  user = new User({ name, email, password });
  await user.save();

  res.status(201).json({ message: "User Created Successfully", user });
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
//Sk5PkYLj541twUqs
