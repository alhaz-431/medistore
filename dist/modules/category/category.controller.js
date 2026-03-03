"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const createCategory = async (req, res) => {
    const result = await category_service_1.CategoryService.createCategoryIntoDB(req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
};
const getAllCategories = async (req, res) => {
    const result = await category_service_1.CategoryService.getAllCategoriesFromDB();
    res.status(200).json({
        success: true,
        data: result,
    });
};
const updateCategory = async (req, res) => {
    const result = await category_service_1.CategoryService.updateCategoryIntoDB(req.params.id, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
};
const deleteCategory = async (req, res) => {
    const result = await category_service_1.CategoryService.deleteCategoryFromDB(req.params.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.CategoryController = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
