const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  }, 
  email: {
    type: String,
    required: [true, "email is required"],
    validate: [validator.isEmail, "please enter correct email"],
    unique: [true, "THIS EMAIL IS ALREADY REGISTERED"],
  },
  password: {
    type: String,
    required: [true, "password is requried"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
});

// encrypting the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isCorrectPass = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// generate jwt token
userSchema.methods.generatejwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
