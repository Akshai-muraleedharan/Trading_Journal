import request from "supertest"
import app from "../src/app.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";

dotenv.config({ path: ".env.test", override: true });


const userEmail = "akshaimuraleedharan@gmail.com"



beforeAll(async () => {
    await connectDB(process.env.MONGO_URI);
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

let token = null




describe("Test server route health", () => {
    test("health", async () => {
        const res = await request(app).get("/api/health")
        expect(res.statusCode).toBe(200);
    })

})

describe("User Auth db test", () => {


    test("Account Register", async () => {
        const res = await request(app).post("/api/v1/user/register").send({
            userName: "akshai",
            email: userEmail,
            password: "Akshai984"
        })
        expect(res.statusCode).toBe(201);
    })

    test("Account already exist", async () => {
        const res = await request(app).post("/api/v1/user/register").send({
            userName: "akshai",
            email: userEmail,
            password: "Akshai984"
        })
        expect(res.statusCode).toBe(409);
    })

    test("User Login", async () => {

        const res = await request(app).post("/api/v1/user/login").send({
            email: userEmail,
            password: "Akshai984"
        })


        token = res.body.accessToken

        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body).toHaveProperty("accessToken");
        expect(typeof res.body.accessToken).toBe("string")
        expect(res.body.data.email).toBe(userEmail)
        expect(res.headers["set-cookie"]).toBeDefined();

    })

})



describe("Journal db test", () => {

    test('create journal', async () => {
        const res = await request(app).post("/api/v1/journal").set("Authorization", `Bearer ${token}`).send({
            title: "BankNifty Breakout",
            tradeDate: "2026-03-27T09:30:00Z",
            tradeAmount: 10000,
            pnl: 1250,
            duration: "00:45",
            timeFrame: "5m",
            notes: "Breakout above resistance level",
            strategy: "INTRADAY",
            isProfit: "PROFIT"
        })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.message).toBe("Journal create successfully")

    })

})
