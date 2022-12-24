# Authentication and Authorization

- **Authentication**: It is a process using which we can uniquely identify users on our application. This process tells us about who the user is. The general signup, login, logout flow is used to authenticate a user.

- **Authorization**: Its is a process using which we can identify the capabilities of a user,i.e., what a user can do on our application.

## How to do Authentication??

- Mobile Number based Authentication. (OTP based, link-to-mobile, etc...)
- OmniAuth or OAuth. (login via gmail, fb, github, etc...)
- WebOTP.
- Token based Authentication. (Done from scratch in this project, otherwise PassportJS APIs can be used for it.)

## Token Based Authentication

- JWT -> Json Web Token
- To generate the JWT token, we actually use the client credentials.

---

## _STEPS_ for setting up the the Full Authorisation and Authentication Service

### Setting up basic server

- Create the folders:
  - src/config
  - src/controllers
  - src/middlewares
  - src/repository
  - src/routes
  - src/services
  - src/utils
- Create the following files in `src/` :
  - index.js
  - .env
  - .gitignore
- Install the following packages:
  - express
  - bodyparser
  - dotenv
  - sequelize
  - sequelize-cli
  - mysql2
- Set up the basic express server:
  - write the following code in `index.js`

 ```javascript
 const bodyParser = require("body-parser");
 const express = require("express");
 
 const { PORT } = require("./config/serverConfig.js");

 const setupAndstartServer = async function () {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
        console.log("Server started at", PORT);
   });
  };

setupAndstartServer();
 ```

- In `.env` file define `PORT = <port_number>`.
- Create a file `serverConfig.js` in `src/conifg`, with the following code in it:

```javascript
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
};
```

- To start the server by running `npm start`, go to the `package.json` file and replace the `"scripts"` key with

```json
"scripts": {
    "start": "npx nodemon src/index.js"
  }
```

### Setting up DB

- Databases required
  - User
  - Role
  - UserRoles

- Design of the Databases

  - **Users Table _(or User Model)_**

    - id (created by sequelize automatically)
    - email
    - password
    - createdAt (created by sequelize automatically)
    - updatedAt (created by sequelize automatically)
  
  - **Roles Table _(or Role Model)_**

    - id (created by sequelize automatically)
    - name
    - createdAt (created by sequelize automatically)
    - updatedAt (created by sequelize automatically)
  
  - **UserRoles Table** : used as a `through` table to create _MANY-TO-MANY_ associations between tables `Users` and `Roles`.

