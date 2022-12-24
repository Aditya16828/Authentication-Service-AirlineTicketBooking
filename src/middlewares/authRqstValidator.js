const validateUserSignup = (req, res, next) => {
    if(!req.body.email){
        return res.status(400).json({
            data: {},
            success: false,
            message: "Plz enter your email id",
            err: "Email missing!!!"
        });
    }

    if(!req.body.password){
        return res.status(400).json({
            data: {},
            success: false,
            message: "Plz enter your password",
            err: "password missing!!!"
        });
    }

    next();
}

const validateIsAdminrequest = (req, res, next) => {
    if(!req.body.userId){
        return res.status(400).json({
            data: {},
            success: false,
            message: "Plz enter user id",
            err: "user id missing!!!"
        })
    }

    next();
}

module.exports = {validateUserSignup, validateIsAdminrequest};