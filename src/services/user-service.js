const {UserRepository} = require('../repository/index');

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
}

module.exports = UserService;