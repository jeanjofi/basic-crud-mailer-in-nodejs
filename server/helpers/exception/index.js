"use strict";

const Exception = {};


Exception.SERVER_ERROR_EXCEPTION = 'serverErrorException';

Exception.DUPLICATE_ENTRIES_EXCEPTION = 'duplicateEntriesException';

Exception.MODEL_NOT_FOUND_EXCEPTION = 'modelNotFoundException';

Exception.INVALID_INPUT = 'invalidInputException';



Exception.handleMessage = function (err) {

    switch (err.message) {
        case Exception.MODEL_NOT_FOUND_EXCEPTION:
            return {
                status: 404,
                type: Exception.MODEL_NOT_FOUND_EXCEPTION,
                message: 'Entity not found',
            };

        case Exception.DUPLICATE_ENTRIES_EXCEPTION:
            return {
                status: 409,
                type: this.DUPLICATE_ENTRIES_EXCEPTION,
                message: 'Entity with this name already exist',
            };

        default:
            return {
                status: 500,
                type: Exception.SERVER_ERROR_EXCEPTION,
                message: 'Internal Server Error',
            };

    }
}

Exception.handleCode = function (err) {

    switch (err.code) {
        case '23503':
            return {
                status: 400,
                type: Exception.INVALID_INPUT,
                message: err.detail || err.message,
            };

        case '23505':
            return {
                status: 400,
                type: Exception.INVALID_INPUT,
                message: err.detail || err.message,
            };

    }
}



Exception.failWith = function (res, err) {
    console.log(err)
    const result = Exception.handleCode(err) || Exception.handleMessage(err);
    const data = {error: {type: result.type, message: result.message}};
    return res
        .status(result.status)
        .json(data);

}


module.exports = Exception;


