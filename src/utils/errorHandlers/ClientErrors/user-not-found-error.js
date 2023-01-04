const {StatusCodes} = require('http-status-codes');
const AppErrors = require('../errorHandler');

class UserNotFound extends AppErrors{
    constructor(byid = false){
        let error;
        if(!byid){
            error = {
                name: "UserNotFoundError",
                message: "Email id not Matching, plz try again",
                explanation: "Incorrect Email id Enterred",
                statusCode: StatusCodes.FORBIDDEN
            };
        } else {
            error = {
                name: "UserNotFoundError",
                message: "UserId not Matching, plz try again",
                explanation: "Incorrect UserId Enterred",
                statusCode: StatusCodes.FORBIDDEN
            };
        }
        
        super(
            error.name,
            error.message,
            error.explanation,
            error.statusCode
        );
    }
}

module.exports = UserNotFound;