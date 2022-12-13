const bodyParser = require("body-parser");
const express = require("express");

const { PORT } = require("./config/serverConfig.js");

const setupAndstartServer = async function () {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, function () {
    console.log("Server started at", PORT);
  });
};

setupAndstartServer();
