"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const client_1 = require("../../generated/prisma/client");
function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let errMessage = "Internal server Error!";
    let errorDetails = err;
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        ((statusCode = 400), (errMessage = "Incorrect body or missing a fields"));
    }
    res.status(statusCode);
    res.json({ success: false, meeage: errMessage, error: errorDetails });
}
