const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SCHEMA DEFINATION //

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// GENERATE AUTHORIZATON TOKEN //
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { email: this.email.toString() },
      process.env.JWT_SECRET
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    res.send("the error " + error);
    console.log("the error " + error);
  }
};

// PASSWORD BCRYPT //
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const userModal = mongoose.model("users", userSchema);

module.exports = userModal;
