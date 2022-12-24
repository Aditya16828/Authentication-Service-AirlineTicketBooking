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
  
  - **UserRoles Table** : used as a `through` - table to create _MANY-TO-MANY_ associations between tables `Users` and `Roles`.

### Steps

- To create a Database, run the command `npx sequelize db:create`. This will create the following folders in the folder in which the command was run.
- Move those folders into the `./src/`. Hence, the `./src/` folder structure is
  
  - src/config
  - src/controllers
  - src/middlewares
  - src/migrations
  - src/models
  - src/repository
  - src/routes
  - src/seeders
  - src/services
  - src/utils

- Now inside `./src/`, run `npx sequelize model:generate --name <MODEL_NAME> --attributes <A1>:<TYPE> <A2>:<TYPE> ...`.
- In the `./src/models/` and `./src/migrations/`, 2 files are created with same name as that of the model name. Make the necessary changes.
- **(For Associations)**
  - _MANY-TO-MANY_ (Here): In the `user` and `role` model `.js` files, add the code snippet in the

  ```javascript
  static associate(models)
  ```

  | `user.js`                         | `role.js`                         |
  |-----------------------------------|-----------------------------------|
  |                                   |
  |```javascript                      |```javascript
  |this.belongsToMany(models.Role, {  |this.belongsToMany(models.User, {  |
  |              through: 'UserRoles' |              through: 'UserRoles' |
  |          });                      |          });                      |
  |```                                |```                                |
