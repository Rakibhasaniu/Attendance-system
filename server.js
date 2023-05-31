const express = require("express");
const connectDB = require("./db");
const app = express();

app.get("/", (req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@example.com",
  };
  res.json(obj);
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
