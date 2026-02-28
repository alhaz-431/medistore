"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineService = void 0;
const prisma_1 = require("../../lib/prisma");
// ১. নতুন মেডিসিন তৈরি করা (Create)
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
        // যদি রিলেশনে সমস্যা থাকে, তবে রিলেশন ছাড়া ডাটা পাঠাবে
        console.log("Relation Error, fetching basic data:", error.message);
        return await prisma_1.prisma.medicines.findMany({
            where: sellerId ? { sellerId } : {},
        });
    }
};
// ৩. আইডি দিয়ে একটি নির্দিষ্ট মেডিসিন খুঁজে বের করা
const getSingleMedicineFromDB = async (id) => {
    return prisma_1.prisma.medicines.findUnique({
        where: { id },
    });
};
// ৪. মেডিসিনের তথ্য আপডেট করা
const updateMedicineIntoDB = async (id, data) => {
    return prisma_1.prisma.medicines.update({
        where: { id },
        data,
    });
};
// ৫. ডাটাবেজ থেকে মেডিসিন মুছে ফেলা
const deleteMedicineFromDB = async (id) => {
    return prisma_1.prisma.medicines.delete({
        where: { id },
    });
};
// সবগুলো ফাংশন এক্সপোর্ট করা হলো
exports.MedicineService = {
    createMedicineIntoDB,
    getAllMedicinesFromDB,
    getSingleMedicineFromDB,
    updateMedicineIntoDB,
    deleteMedicineFromDB,
};
