"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineSchema = void 0;
const zod_1 = require("zod");
// Medicine create/update validation
exports.medicineSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Medicine name is required" }),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().refine((val) => val > 0, { message: "Price must be greater than 0" }),
    stock: zod_1.z.number().refine((val) => val >= 0, { message: "Stock must be 0 or more" }),
    image: zod_1.z.string().url().optional(),
    categoryId: zod_1.z.string().nonempty({ message: "Category is required" }),
    sellerId: zod_1.z.string().nonempty({ message: "Seller is required" }),
});
