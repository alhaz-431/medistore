"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineSchema = void 0;
const zod_1 = require("zod");
exports.medicineSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }), // ✅ ঠিক আছে
    price: zod_1.z
        .number() // number type check
        .refine((val) => val !== undefined, { message: "Price is required" }), // undefined check
});
