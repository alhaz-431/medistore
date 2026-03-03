"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
exports.UserController = {
    searchUsers: async (req, res) => {
        try {
            const searchTerm = req.query.search;
            const users = await user_service_1.UserService.searchUsers(searchTerm);
            res.status(200).json(users);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
