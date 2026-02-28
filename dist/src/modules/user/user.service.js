"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../../lib/prisma");
const user_constant_1 = require("./user.constant");
exports.UserService = {
    searchUsers: async (searchTerm) => {
        const users = await prisma_1.prisma.user.findMany({
            where: {
                OR: user_constant_1.UserSearchableFields.map((field) => ({
                    [field]: { contains: searchTerm, mode: "insensitive" },
                })),
            },
        });
        return users;
    },
    getAllUsers: async () => {
        return prisma_1.prisma.user.findMany();
    },
};
