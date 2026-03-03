"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../modules/Auth/auth.service");
const prisma_1 = require("../lib/prisma");
const prisma_2 = require("../../generated/prisma");
var UserRole;
(function (UserRole) {
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["SELLER"] = "SELLER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1]; // Bearer token
            if (!token)
                throw new Error("Token not found!!");
            const decoded = jsonwebtoken_1.default.verify(token, auth_service_1.secret);
            const userData = await prisma_1.prisma.user.findUnique({
                where: { email: decoded.email },
            });
            if (!userData)
                throw new Error("Unauthorized!");
            if (userData.role !== decoded.role)
                throw new Error("Role mismatch!");
            if (userData.status !== prisma_2.Status.ACTIVE)
                throw new Error("Unauthorized!!"); // ✅ Use enum
            if (roles.length && !roles.includes(decoded.role)) {
                throw new Error("Unauthorized!!!");
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = auth;
