"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middlewares/auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdmin = async () => {
    const hashedPassword = await bcryptjs_1.default.hash("12345", 8);
    const adminData = {
        name: "Admin",
        email: "admin@gmail.com",
        role: auth_1.UserRole.ADMIN,
        password: hashedPassword,
    };
    // 1.is Admin already exists!
    // 2.if Exists then return
    // 3.If not then create
    try {
        const isExists = await prisma_1.prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });
        if (isExists) {
            console.log("Admin already exists!!");
            return;
        }
        const admin = await prisma_1.prisma.user.create({
            data: adminData,
        });
        console.log("Admin created successfully!!");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
};
seedAdmin();
