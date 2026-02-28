"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.secret = void 0;
const prisma_1 = require("../../lib/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secret = "lsdngkdsbfgbkdf";
const createUserIntoDB = async (payload) => {
    const hashPassword = await bcryptjs_1.default.hash(payload.password, 8);
    const result = await prisma_1.prisma.user.create({
        data: { ...payload, password: hashPassword },
    });
    const { password, ...newResult } = result;
    return newResult;
};
const loginUserIntoDB = async (payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new Error("User not found!");
    }
    const ispasswordMatched = await bcryptjs_1.default.compare(payload.password, user.password);
    if (!ispasswordMatched) {
        throw new Error("Invalid credentials!!");
    }
    const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        status: user.status,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(userData, exports.secret, { expiresIn: "1d" });
    return {
        token,
        user: userData,
    };
};
exports.AuthService = {
    // Add service methods here
    createUserIntoDB,
    loginUserIntoDB,
};
