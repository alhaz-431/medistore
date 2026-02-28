"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const connectionString = process.env.DATABASE_URL;
// ১. পোল তৈরি করুন
const pool = new pg_1.Pool({ connectionString });
// ২. অ্যাডাপ্টার তৈরি করুন (এটিই আপনার এরর ডিমান্ড করছে)
const adapter = new adapter_pg_1.PrismaPg(pool);
// ৩. অ্যাডাপ্টারটি কনস্ট্রাক্টরে পাস করুন
exports.prisma = new client_1.PrismaClient({ adapter });
