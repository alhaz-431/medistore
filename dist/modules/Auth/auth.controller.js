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
            message: "User registered successfully",
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
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: {
                user: result.user,
                token: result.token,
            },
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 401,
            success: false,
            message: error?.message || "Invalid credentials",
            data: null,
        });
    }
};
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: null,
    });
};
exports.AuthController = {
    createUser,
    loginUser,
    logoutUser,
};
