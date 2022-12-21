const {User} = require('../models/index');

class UserRepository{

    async create(userData){
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.log("Error in Repository layer");
            console.log(error);
            throw {error};
        }
    }

    async delete(userid){
        try {
            await User.destroy({where: {id: userid}});
            return true;
        } catch (error) {
            console.log("Error in Repository layer");
            console.log(error);
            throw {error};
        }
    }
}

module.exports = UserRepository;