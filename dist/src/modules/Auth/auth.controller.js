"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createUser = async (req, res, next) => {
    try {
        const result = await auth_service_1.AuthService.createUserIntoDB(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "User created",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const loginUser = async (req, res) => {
    try {
        const result = await auth_service_1.AuthService.loginUserIntoDB(req.body);
        res.cookie("token", result.token, {
            secure: false,
            httpOnly: true,
            sameSite: "strict", // none / strict / lax
        });
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: error?.message || "Something went wrong",
            data: null,
        });
    }
};
exports.AuthController = {
    // Add controller methods here
    createUser,
    loginUser,
};
