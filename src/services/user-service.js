const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {UserRepository} = require('../repository/index');
const {JWT_KEY} = require('../config/serverConfig');
const {
    PasswordMismatchError, 
    UserNotFoundError, 
    TokenVerificationError
} = require('../utils/errorHandlers/ClientErrors/index');

class UserService{
    constructor(){
        this.userRepo = new UserRepository();
    }

    async createUser(userData){
        try {
            const response = await this.userRepo.create(userData);
            return response;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Error in Service Layer");
            console.log(error);
            throw error;
        }
    }

    async deleteUser(email, password, token){
        try {
            const user = await this.userRepo.getbyEmail(email);
            if(!user){
                let error = new UserNotFoundError();
                throw error;
            }
            const matchPassword = this.checkPassword(password, user.password);
            
            if(!matchPassword){
                let error = new PasswordMismatchError();
                throw error;
            }

            let verificationResponse = this.verifyToken(token);
            if(!verificationResponse){
                let error = new TokenVerificationError();
                throw error;
            }

            await this.userRepo.delete(user.id);
            return true;
        } catch (error){
            // console.log("Error in Service Layer");
            // console.log(error);
            throw error;
        }
    }

    createToken(user){
        try {
            /**
             * user: {email, id}
             */
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
            if(error.name == 'JsonWebTokenError'){
                throw new TokenVerificationError();
            }
            console.log("Error in verifying Token");
            throw error;
        }
    }

    checkPassword(userPassword, encryptedPassword){
        try {
            const response = bcrypt.compareSync(userPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("Error in Password Check");
            console.log(error);
            throw {error};
        }
    }

    async signIn(email, password){
        try {
            const user = await this.userRepo.getbyEmail(email);
            if(!user){
                let error = new UserNotFoundError();
                throw error;
            }
            /**
             * user: {id, email, password, createdAt, updatedAt}
             */
            const matchPassword = this.checkPassword(password, user.password);
            
            if(!matchPassword){
                let error = new PasswordMismatchError();
                throw error;
            }

            const newtoken = this.createToken({email: user.email, id: user.id});
            return {token: newtoken, validity: "96 hrs"};
        } catch (error) {
            console.log("Service Layer Error is :", error);
            throw error;
        }
    }

    async AuthenticateUser(token){
        try {
            const response = this.verifyToken(token);
            const user = await this.userRepo.getbyId(response.id);
            if(!user){
                throw new UserNotFoundError();
            }
            return user;
        } catch (error) {
            console.log("Error in Service Layer, cannot get the user id as per token");
            console.log(error);
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            const response = await this.userRepo.isAdmin(userId);
            return response;
        } catch (error){
            console.log("Error in Service Layer, cannot get the user role");
            console.log(error);
            throw error;
        }
    }

    async getUserbyId(userId){
        try {
            const response = await this.userRepo.getbyId(userId);
            return response;
        } catch (error) {
            console.log("Error in Service Layer, cannot get the user role");
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;