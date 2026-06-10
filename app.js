require("dotenv").config();

const xss = require("xss");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    });
  }

  next();
});
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./src/routes/auth.routes"));
app.use("/api/v1", require("./src/routes/protected.routes"));

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB Successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error MongoDB", err.message);
  });