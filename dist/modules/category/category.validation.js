"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineSchema = void 0;
const zod_1 = require("zod");
exports.medicineSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    price: zod_1.z
        .number()
        .refine((val) => val !== undefined, { message: "Price is required" }),
});
