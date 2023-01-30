const bodyParser = require("body-parser");
const express = require("express");

const { PORT } = require("./config/serverConfig.js");
const APIroutes = require("./routes/index");

const db = require('./models/index');

const setupAndstartServer = async function () {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/authenticationservice/api/", APIroutes);

    app.listen(PORT, async () => {
        console.log("Server started at", PORT);

		if(process.env.DB_SYNC){
			db.sequelize.sync({alter: true});
		}
	});
};

setupAndstartServer();
