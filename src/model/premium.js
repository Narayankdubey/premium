const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SCHEMA DEFINATION //

const premiumSchema = mongoose.Schema({
  userId:{
    type: String,
    require: true,
  },
  dob: {
    type: Date,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  sumAssured: {
    type: Number,
    // required: true,
  },
  modalPremium: {
    type: Number,
    // required: true,
  },
  premiumFrequency: {
    type: String,
    // required: true,
  },
  pt: {
    type: Number,
    // required: true,
  },
  ppt: {
    type: Number,
    // required: true,
  },
});

const premiumModal = mongoose.model("premiums", premiumSchema);

module.exports = premiumModal;
