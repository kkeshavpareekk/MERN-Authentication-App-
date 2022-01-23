const jwt = require("jsonwebtoken");
const BigPromise = require("../middlewares/bigPromise");
const User = require("../models/user");
const setCookieToken = require("../utils/setCookieToken");
const ErrorHandler = require("../utils/ErrorHandler");

exports.singUp = BigPromise(async (req, res, next) => {
  // get the data
  const { name, email, password, verifyPassword } = req.body;

  // if no data
  if (!name || !email || !password || !verifyPassword) {
    return next(new ErrorHandler("Please Provide all the details", 401));
  }

  if (password !== verifyPassword) {
    return next(new ErrorHandler("Passwords did not match", 402));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("Email already registered", 402));
  }

  user = await User.create({
    name,
    email,
    password,
  });

  setCookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide Name and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("No user with this Email found", 404));
  }

  const correct_pass = await user.isCorrectPass(password);

  if (!correct_pass) {
    return next(new ErrorHandler("Password is incorrect", 402));
  }

  setCookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: "true",
    message: "successfully logout",
  });
});

exports.verifyToken = BigPromise(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.send(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (!verified) {
    return res.send(false);
  }

  return res.send(true);
});
