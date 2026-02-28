"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const reviews_controller_1 = require("./reviews.controller");
const router = (0, express_1.Router)();
router.post("/", reviews_controller_1.ReviewController.createReview);
router.get("/:medicineId", reviews_controller_1.ReviewController.getReviewsByMedicine);
exports.ReviewRoutes = router;
