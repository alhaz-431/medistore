"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategoryIntoDB = async (payload) => {
    return prisma_1.prisma.category.create({
        data: payload,
    });
};
const getAllCategoriesFromDB = async () => {
    return prisma_1.prisma.category.findMany();
};
const updateCategoryIntoDB = async (id, payload) => {
    return prisma_1.prisma.category.update({
        where: { id },
        data: payload,
    });
};
const deleteCategoryFromDB = async (id) => {
    return prisma_1.prisma.category.delete({
        where: { id },
    });
};
exports.CategoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB,
};
