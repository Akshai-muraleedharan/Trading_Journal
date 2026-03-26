// tests/setup.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";

dotenv.config({ path: ".env.test" });
console.log("hai its hitted");

beforeAll(async () => {
    await connectDB(process.env.MONGO_URI);
});

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});