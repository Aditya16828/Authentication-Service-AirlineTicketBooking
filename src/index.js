const bodyParser = require("body-parser");
const express = require("express");

const { PORT } = require("./config/serverConfig.js");
const APIroutes = require("./routes/index");
const { UserService } = require("./services/index");

const db = require('./models/index');
const {User, Role} = require('./models/index');

const setupAndstartServer = async function () {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api/", APIroutes);

    app.listen(PORT, async () => {
        console.log("Server started at", PORT);

		if(process.env.DB_SYNC){
			db.sequelize.sync({alter: true});
		}

		// const user1 = await User.findByPk(4);
		// const role1 = await Role.findByPk(1);
		// user1.addRole(role1);

		// const response = await user1.hasRole(role1);
		// console.log(response);
	});
};

setupAndstartServer();
