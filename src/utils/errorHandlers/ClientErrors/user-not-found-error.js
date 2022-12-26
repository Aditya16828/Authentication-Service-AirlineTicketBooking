const {StatusCodes} = require('http-status-codes');
const AppErrors = require('../error-handler');

class UserNotFound extends AppErrors{
    constructor(){
        let error = {
            name: "UserNotFoundError",
            message: "Email id not Matching, plz try again",
            explanation: "Incorrect Email id Enterred",
            statusCode: StatusCodes.FORBIDDEN
        };
        super(
            error.name,
            error.message,
            error.explanation,
            error.statusCode
        );
    }
}

module.exports = UserNotFound;