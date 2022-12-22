const bodyParser = require("body-parser");
const express = require("express");

const { PORT } = require("./config/serverConfig.js");
const APIroutes = require("./routes/index");
const { UserService } = require("./services/index");

const setupAndstartServer = async function () {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api/", APIroutes);

    app.listen(PORT, async () => {
        console.log("Server started at", PORT);
		// const ur = new UserRepository();
		// const response = await ur.getbyId(3);
		// console.log(response.dataValues);

		// const us = new UserService();
		
		// const newToken = await us.createToken({email: "aditya123@rediffmail.com", id: 3});
		// console.log(newToken);

		// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YTEyM0ByZWRpZmZtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE2NzE3Mzg3NTYsImV4cCI6MTY3MjA4NDM1Nn0.cRgBiVS3NSwhvFUJ7lEeR3QLUYJ30ZLXGTYTD2mKAZw';
		// const response = await us.verifyToken(token);
		// console.log(response);
	});
};

setupAndstartServer();
