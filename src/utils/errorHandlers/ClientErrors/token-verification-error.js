const {StatusCodes} = require('http-status-codes');
const AppErrors = require('../errorHandler');

class TokenVerification extends AppErrors{
    constructor(){
        let error = {
            name: "TokenVerificationError",
            message: "Token not Matching, plz try again",
            explanation: "Incorrect Token Provided",
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

module.exports = TokenVerification;