const express = require("express");

// env config
require("dotenv").config();

// cors
const cors = require("cors");

// handle cookies 
const cookieParser = require("cookie-parser");

// Error middleware
const ErrorMiddleware = require("./middlewares/error");

// import router
const userRoute = require("./routes/userRoute");

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


// router middleware
app.use("/api/v1", userRoute);

// error middleware
app.use(ErrorMiddleware);

module.exports = app;
