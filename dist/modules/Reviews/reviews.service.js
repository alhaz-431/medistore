"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = require("../../lib/prisma");
const createReviewIntoDB = async (userId, payload) => {
    const result = await prisma_1.prisma.reviews.create({
        data: {
            customerId: userId,
            ...payload,
        },
    });
    return result;
};
const getReviewsByMedicine = async (medicineId) => {
    return prisma_1.prisma.reviews.findMany({
        where: { medicineId },
        include: {
            customer: true,
        },
    });
};
exports.ReviewService = {
    createReviewIntoDB,
    getReviewsByMedicine,
};
