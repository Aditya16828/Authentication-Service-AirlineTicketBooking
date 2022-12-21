const {UserService} = require('../services/index');

const userservice = new UserService();

const create = async (req, res) => {
    try {
        const user = await userservice.createUser({email: req.body.email, password: req.body.password});
        return res.status(201).json({
            data: user,
            success: true,
            message: "Successfully created Account",
            err: {}            
        });
    } catch (error) {
        console.log("Error in Controller");
        res.sattus(500).json({
            data: {},
            success: false,
            message: "Unable to create Account",
            err: error
        });
    }
}

const remove = async (req, res) => {
    try {
        const response = await userservice.deleteUser(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted Account",
            err: {}            
        });
    } catch (error) {
        console.log("Error in Controller");
        res.sattus(500).json({
            data: {},
            success: false,
            message: "Unable to delete Account",
            err: error
        });
    }
}

module.exports = {create, remove};