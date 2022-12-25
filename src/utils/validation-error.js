const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");

class ValidationError extends AppErrors {
    constructor(error){
        let explanation = [];
        let error_name = error.name;

        error.errors.forEach((err) => {
            explanation.push(err.message);
        });

        let message = 'Not able to validate the data sent in the request';
        super(
            error_name,
            message,
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = ValidationError;
