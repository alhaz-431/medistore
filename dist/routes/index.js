"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
// Module routes imports
const user_route_1 = require("../modules/user/user.route");
const medicine_route_1 = require("../modules/medicine/medicine.route");
const orders_route_1 = require("../modules/orders/orders.route");
const category_route_1 = require("../modules/category/category.route");
const reviews_route_1 = require("../modules/Reviews/reviews.route");
const router = (0, express_1.Router)();
// Route manager
const routerManager = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/medicines",
        route: medicine_route_1.MedicineRoutes,
    },
    {
        path: "/orders",
        route: orders_route_1.OrderRoutes,
    },
    {
        path: "/categories",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/reviews",
        route: reviews_route_1.ReviewRoutes,
    },
];
// Apply all routes
routerManager.forEach((r) => router.use(r.path, r.route));
exports.default = router;
