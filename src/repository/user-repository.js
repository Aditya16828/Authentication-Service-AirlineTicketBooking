const { User, Role } = require("../models/index");

class UserRepository {
    async create(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.log("Error in Repository layer");
            console.log(error);
            throw { error };
        }
    }

    async delete(userid) {
        try {
            await User.destroy({ where: { id: userid } });
            return true;
        } catch (error) {
            console.log("Error in Repository layer");
            console.log(error);
            throw { error };
        }
    }

    async getbyId(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ["email", "id"],
            });
            return user;
        } catch (error) {
            console.log("Error in fetching the user by id");
            console.log(error);
            throw { error };
        }
    }

    async getbyEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                },
            });
            return user;
        } catch (error) {
            console.log("Error in Repository layer, cannot find the email id");
            console.log(error);
            throw { error };
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const admin = await Role.findOne({where: {name: "ADMIN"}});
            return user.hasRole(admin);
        } catch (error) {
            console.log("Error in Repository layer, cannot find the role");
            console.log(error);
            throw { error };
        }
    }
}

module.exports = UserRepository;
