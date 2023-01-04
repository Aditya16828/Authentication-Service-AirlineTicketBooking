const { User, Role, AirplaneAuthority } = require("../models/index");
const {
    ValidationError,
    DuplicateEntryError,
    UserNotFoundError
} = require("../utils/errorHandlers/ClientErrors/index");

class UserRepository {
    async #addAdmin(userid) {
        const user = await User.findByPk(userid);
        const role = await Role.findByPk(1);
        user.addRole(role);
    }

    async #addNormalUser(userid) {
        const user = await User.findByPk(userid);
        const role = await Role.findByPk(2);
        user.addRole(role);
    }

    async #addAuthority(userid) {
        const user = await User.findByPk(userid);
        const role = await Role.findByPk(3);
        user.addRole(role);
    }

    async #find(userAuthority) {
        const response = await AirplaneAuthority.findOne({
            where:{
                domainName: userAuthority
            }
        });
        return response;
    }

    async create(userData) {
        try {
            const user = await User.create(userData);
            let userEmail = userData.email;
            
            let domainName = userEmail.split("@")[1].split(".")[0];
            
            let message;
            if (domainName == "admin") {
                await this.#addAdmin(user.dataValues.id);
                message = "Admin Added";
            } else if ((await this.#find(domainName))) {
                await this.#addAuthority(user.dataValues.id);
                message = "Airplane Authority added";
            } else {
                await this.#addNormalUser(user.dataValues.id);
                message = "Customer added";
            }
            
            return {user, message};
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                let validationerror = new ValidationError(error);
                throw validationerror;
            }
            if (error.name == "SequelizeUniqueConstraintError") {
                throw new DuplicateEntryError(error);
            }
            console.log("Error in Repository layer");
            throw error;
        }
    }

    async delete(userid) {
        try {
            await User.destroy({ where: { id: userid } });
            return true;
        } catch (error) {
            console.log("Error in Repository layer");
            console.log(error);
            throw error;
        }
    }

    async getbyId(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ["email", "id"],
            });
            if(user){
                return user;
            } else {
                const byid = true;
                const userNotFounderr = new UserNotFoundError(byid);
                throw userNotFounderr;
            }
        } catch (error) {
            console.log("Error in fetching the user by id");
            console.log(error);
            throw error;
        }
    }

    async getbyEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail,
                },
            });
            if(user){
                return user;
            } else {
                const userNotFounderr = new UserNotFoundError();
                throw userNotFounderr;
            }
        } catch (error) {
            console.log("Error in Repository layer, cannot find the email id");
            console.log(error);
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            if(user){
                const admin = await Role.findByPk(1);
                return user.hasRole(admin);
            } else {
                const byid = true;
                const userNotFounderr = new UserNotFoundError(byid);
                throw userNotFounderr;
            }
        } catch (error) {
            console.log("Error in Repository layer, cannot find the role");
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;
