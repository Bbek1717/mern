"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandler = void 0;
class CustomError extends Error {
    status;
    statusCode;
    success;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.success = false;
        Error.captureStackTrace(this, CustomError);
    }
}
exports.errorhandler = ((err, req, res, next) => {
    console.log(err);
    const message = err.message || 'something went wrong';
    const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
    const status = err.status || 'error';
    const success = err.success || 'false';
    res.status(statusCode).json({
        message,
        status,
        success
    });
});
exports.default = CustomError;
