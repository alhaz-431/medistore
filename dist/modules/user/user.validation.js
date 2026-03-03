"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const constant_1 = require("../../constant");
exports.userValidationSchema = zod_1.z.object({
    profilePicture: zod_1.z
        .any()
        .refine((file) => file?.size <= constant_1.MAX_UPLOAD_SIZE, {
        message: `File size must be less than ${constant_1.MAX_UPLOAD_SIZE / 1024 / 1024} MB`,
    }),
});
