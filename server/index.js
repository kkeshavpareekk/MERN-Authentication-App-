const express = require("express");
require("dotenv").config();
const app = require("./app");

const connectWithDB = require("./config/db");

// connect with database
connectWithDB();

app.listen(process.env.PORT, () => console.log("sever is running..."));
