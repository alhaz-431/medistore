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
        const medicineData = {
            ...req.body,
            sellerId: req.user?.id,
        };
        const validatedData = medicine_validation_1.medicineSchema.parse(medicineData);
        const result = await medicine_service_1.MedicineService.createMedicineIntoDB(validatedData, req.user?.id);
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "Medicine created successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error?.issues
            ? error.issues.map((i) => i.message).join(", ")
            : error?.message;
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: errorMessage || "Something went wrong",
            data: null,
        });
    }
};
const getAllMedicines = async (req, res) => {
    try {
        const result = await medicine_service_1.MedicineService.getAllMedicinesFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Medicines retrieved successfully",
            data: result,
        });
    }
    catch (error) {
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
