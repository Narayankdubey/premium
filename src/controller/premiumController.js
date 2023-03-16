const premiumModal = require("../model/premium");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { calulatePremium } = require("../utils/helper");

// POST //
const storePremium = async (req, res) => {
  try {
    const premium = new premiumModal(req.body);
    const createPremium = await premium.save();
    res.status(201).send(createPremium);
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET ALL USERS DATA //
const getPremium = async (req, res) => {
  try {
    const userPremium = await premiumModal.find();
    res.send(userPremium);
  } catch (e) {
    res.send(e);
  }
};

const formatData = (raw) => {
  const data = JSON.parse(JSON.stringify(raw));
  if (data?.dob) {
    data.dob = moment(data.dob).format("YYYY-MM-DD");
  }
  return data;
};

// GET USER DATA BY "ID" //
const getpremiumDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const premiumData = await premiumModal.findOne({ userId: _id });
    const data = formatData(premiumData);
    if (!data) {
      return res.status(404).send("No data saved for the user");
    } else {
      res.send(data);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

// UPDATE USERS DATA //
const updatePremium = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatePremium = await premiumModal.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updatePremium);
  } catch (e) {
    res.status(404).send(e);
  }
};
// UPDATE USERS DATA //
const findAndUpdatePremium = async (req, res) => {
  try {
    const _id = req.params.id;
    const premiumData = await premiumModal.findOne({ userId: _id });
    if (premiumData) {
      const updatePremium = await premiumModal.findByIdAndUpdate(
        { _id: premiumData._id },
        req.body,
        {
          new: true,
        }
      );
      res.send(updatePremium);
    } else {
      const premium = new premiumModal({ ...req.body, userId: _id });
      const createPremium = await premium.save();
      res.status(201).send(createPremium);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const calculatedPremiums = async (req, res) => {
  const _id = req.params.id;
  const premiumData = await premiumModal.findOne({ userId: _id });
  if(premiumData){
  const calculatedPremium = calulatePremium(premiumData);
  res.status(201).send(calculatedPremium)
  }else{
    res.status(400).send("User has not stored the data")
  }
};

// DELETE USERS DATA //
const deletePremium = async (req, res) => {
  try {
    const deleteP = await premiumModal.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    }
    res.send(deleteP);
  } catch (e) {
    res.status(404).send(e);
  }
};

// EXPORT //
module.exports = {
  storePremium,
  getPremium,
  getpremiumDetail,
  updatePremium,
  deletePremium,
  findAndUpdatePremium,
  calculatedPremiums
};
