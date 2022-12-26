const { UserService } = require("../services/index");

const userservice = new UserService();

const create = async (req, res) => {
    try {
        const response = await userservice.createUser({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response.user,
            success: true,
            message: response.message,
            err: {},
        });
    } catch (error) {
        res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation,
        });
    }
};

const remove = async (req, res) => {
    try {
        console.log(req.body);
        const response = await userservice.deleteUser(
            req.body.email,
            req.body.password,
            req.body.token
        );
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted Account",
            err: {},
        });
    } catch (error) {
        console.log("Error in Controller");
        res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
};

const signin = async (req, res) => {
    try {
        const response = await userservice.signIn(
            req.body.email,
            req.body.password
        );
        return res.status(200).json({
            data: response,
            success: true,
            message: "User signed in",
            err: {},
        });
    } catch (error) {
        res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await userservice.AuthenticateUser(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User Authenticated",
            err: {},
        });
    } catch (error) {
        console.log("Error in Controller");
        res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation,
        });
    }
};

const isAdmin = async (req, res) => {
    try {
        const response = await userservice.isAdmin(req.body.userId);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: "User is Admin"
        })
    } catch (error) {
        console.log("Error in Controller");
        res.status(500).json({
            data: {},
            success: false,
            message: "Unable to Authenticate User as Admin",
            err: error,
        });
    }
};

module.exports = { create, remove, signin, isAdmin };
