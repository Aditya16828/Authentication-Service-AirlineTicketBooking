const bodyParser = require("body-parser");
const express = require("express");

const { PORT } = require("./config/serverConfig.js");

const APIroutes = require('./routes/index');

const setupAndstartServer = async function () {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/', APIroutes);

  app.listen(PORT, function () {
    console.log("Server started at", PORT);
  });
};

setupAndstartServer();
