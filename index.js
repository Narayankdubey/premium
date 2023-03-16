require("dotenv").config();
const express = require("express");
require("./src/conn");
const Router = require("./src/routers");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api", Router);

app.use(express.static("./client/static"));
app.use("/images",express.static(path.join(__dirname, "/images")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "static", "index.html"));
});

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
