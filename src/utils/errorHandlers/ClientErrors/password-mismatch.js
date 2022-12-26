const {StatusCodes} = require('http-status-codes');
const AppErrors = require('../error-handler');

class PasswordMismatch extends AppErrors{
    constructor(){
        let error = {
            name: "PasswordMismatchError",
            message: "Password not Matching, plz try again",
            explanation: "Incorrect Password Enterred",
            statusCode: StatusCodes.FORBIDDEN
        }
        super(
            error.name,
            error.message,
            error.explanation,
            error.statusCode
        );
    }
}

module.exports = PasswordMismatch;