const express = require("express");
const Router = express.Router();

const { isAuthorized } = require("./auth");

///////// LOGIN - LOGOUT //////////

const { logIn, logOut } = require("./controller/loginLogout");

Router.post("/login", logIn);
Router.post("/logout", logOut);


////////  USER  ///////

const {
  storeUser,
  getUsers,
  getuserDetail,
  updateuser,
  deleteUser,
} = require("./controller/userController");

Router.post("/users", storeUser);
Router.get("/users", isAuthorized, getUsers);
Router.get("/users/:id",isAuthorized, getuserDetail);
Router.patch("/users/:id",isAuthorized, updateuser);
Router.delete("/users/:id", isAuthorized,deleteUser);

module.exports = Router;


////////  PREMIUM  ///////

const {
  storePremium,
  getPremium,
  getpremiumDetail,
  updatePremium,
  deletePremium,
  findAndUpdatePremium,
  calculatedPremiums
} = require("./controller/premiumController");

Router.post("/premium", isAuthorized,storePremium);
Router.get("/premium", isAuthorized, getPremium);
Router.get("/premium/:id", isAuthorized,getpremiumDetail);
Router.patch("/premium/:id", isAuthorized,updatePremium);
Router.post("/premium/:id", isAuthorized,findAndUpdatePremium);
Router.delete("/premium/:id",isAuthorized, deletePremium);
Router.get("/calculatedPremium/:id",calculatedPremiums);

module.exports = Router;
