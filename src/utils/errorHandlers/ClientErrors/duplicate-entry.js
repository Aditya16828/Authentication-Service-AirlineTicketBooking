const {StatusCodes} = require('http-status-codes');
const AppErrors = require('../errorHandler');

class DuplicateEntry extends AppErrors{
    constructor(error){
        let errorName = error.name;
        
        let message = error.errors[0].message;

        let explanation = error.parent.sqlMessage;

        super(
            errorName,
            message,
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = DuplicateEntry;