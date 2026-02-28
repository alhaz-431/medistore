"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const reviews_service_1 = require("./reviews.service");
const createReview = async (req, res) => {
    const userId = req.user?.id; // Assuming req.user is set by auth middleware and contains the user's ID
    const result = await reviews_service_1.ReviewService.createReviewIntoDB(userId, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
};
const getReviewsByMedicine = async (req, res) => {
    const result = await reviews_service_1.ReviewService.getReviewsByMedicine(req.params.medicineId);
    res.status(200).json({
        success: true,
        data: result,
    });
};
exports.ReviewController = {
    createReview,
    getReviewsByMedicine,
};
