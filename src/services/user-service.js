const jwt = require('jsonwebtoken');

const {UserRepository} = require('../repository/index');
const {JWT_KEY} = require('../config/serverConfig')

class UserService{
    constructor(){
        this.userRepo = new UserRepository();
    }

    async createUser(userData){
        try {
            const user = await this.userRepo.create(userData);
            return user;
        } catch (error) {
            console.log("Error in Service Layer");
            console.log(error);
            throw {error};
        }
    }

    async deleteUser(userid){
        try {
            await this.userRepo.delete(cityid);
            return true;
        } catch (error){
            console.log("Error in Service Layer");
            console.log(error);
            throw {error};
        }
    }

    createToken(user){
        try {
            const token = jwt.sign(user, JWT_KEY, {expiresIn: '96h'});
            return token;
        } catch (error) {
            console.log("Error in token creation");
            console.log(error);
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Error in verifying Token");
            console.log(error);
            throw {error};
        }
    }
}

module.exports = UserService;