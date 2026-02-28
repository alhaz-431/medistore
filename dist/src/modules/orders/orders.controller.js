"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orders_service_1 = require("./orders.service");
exports.OrderController = {
    createOrder: async (req, res) => {
        try {
            const customerId = req.user?.id; // assuming req.user is set by auth middleware
            const order = await orders_service_1.OrderService.createOrderInDB(req.body, customerId);
            res.status(201).json(order);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const customerId = req.user?.id;
            const orders = await orders_service_1.OrderService.getAllOrdersByCustomerDB(customerId);
            res.status(200).json(orders);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getSingleOrder: async (req, res) => {
        try {
            const customerId = req.user?.id;
            const orderId = req.params.id;
            const order = await orders_service_1.OrderService.getSingleOrderFromDB(orderId, customerId);
            res.status(200).json(order);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
