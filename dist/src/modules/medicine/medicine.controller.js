"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const medicine_service_1 = require("./medicine.service");
const medicine_validation_1 = require("./medicine.validation");
const createMedicine = async (req, res) => {
    try {
        // 1️⃣ Validate request body with Zod
        const validatedData = medicine_validation_1.medicineSchema.parse(req.body);
        // 2️⃣ Create medicine in DB (এখানে সেলার আইডি লাগে, তাই req.user?.id থাকবে)
        const result = await medicine_service_1.MedicineService.createMedicineIntoDB(validatedData, req.user?.id);
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "Medicine created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Create Medicine Error:", error);
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: error?.message || "Something went wrong",
            data: null,
        });
    }
};
const getAllMedicines = async (req, res) => {
    try {
        // সরাসরি সার্ভিস কল করুন
        const result = await medicine_service_1.MedicineService.getAllMedicinesFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Medicines retrieved successfully",
            data: result, // এই ডাটাই আপনার সেই ৪টি মেডিসিন
        });
    }
    catch (error) {
        // টার্মিনালে এরর দেখার জন্য এটি যোগ করুন
        console.log("Error logic caught:", error);
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: error?.message || "Internal server Error!",
            data: null,
        });
    }
};
const getSingleMedicine = async (req, res) => {
    try {
        const result = await medicine_service_1.MedicineService.getSingleMedicineFromDB(req.params?.id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Medicine retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: error?.message || "Something went wrong!!",
            data: null,
        });
    }
};
exports.MedicineController = {
    createMedicine,
    getAllMedicines,
    getSingleMedicine,
};
