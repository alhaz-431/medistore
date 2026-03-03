"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineService = void 0;
const prisma_1 = require("../../lib/prisma");
const createMedicineIntoDB = async (data, sellerId) => {
    return prisma_1.prisma.medicines.create({
        data: {
            ...data,
            sellerId: sellerId,
        },
    });
};
const getAllMedicinesFromDB = async (sellerId) => {
    try {
        return await prisma_1.prisma.medicines.findMany({
            where: sellerId ? { sellerId } : {},
            include: {
                category: true,
                seller: true,
            },
        });
    }
    catch (error) {
        console.log("Relation Error, fetching basic data:", error.message);
        return await prisma_1.prisma.medicines.findMany({
            where: sellerId ? { sellerId } : {},
        });
    }
};
const getSingleMedicineFromDB = async (id) => {
    return prisma_1.prisma.medicines.findUnique({
        where: { id },
    });
};
const updateMedicineIntoDB = async (id, data) => {
    return prisma_1.prisma.medicines.update({
        where: { id },
        data,
    });
};
const deleteMedicineFromDB = async (id) => {
    return prisma_1.prisma.medicines.delete({
        where: { id },
    });
};
exports.MedicineService = {
    createMedicineIntoDB,
    getAllMedicinesFromDB,
    getSingleMedicineFromDB,
    updateMedicineIntoDB,
    deleteMedicineFromDB,
};
