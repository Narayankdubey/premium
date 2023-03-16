const userModal = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

///////////  LOGIN ////////////

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input are required");
    }
    const user = await userModal.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await user.generateAuthToken();
      const updatedData = JSON.parse(JSON.stringify(user));
      updatedData.token = token;
      delete updatedData.tokens
      delete updatedData.password
      res.status(200).send(updatedData);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Login");
  }
};

///////////  LOGOUT  //////////

const logOut = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await userModal.findOne({ tokens: { $elemMatch: { token } } });
    if (!user) res.status(400).send("user not found");
    else {
      const updated = await userModal.findOneAndUpdate(
        {
          // tokens:{$elemMatch:{token}},
          email: user.email,
        },
        {
          $pull: {
            tokens: { $elemMatch: { token: token } },
          },
        },
        { new: true }
      );
      if (updated) return res.status(200).send("Logged out successfully");
    }
  } catch (error) {
    res.status(400).send("some error occured");
  }
};

/////////  EXPORT  ////////////

module.exports = {
  logIn,
  logOut,
};
