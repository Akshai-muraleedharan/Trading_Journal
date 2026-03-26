import request from "supertest"
import app from "../src/app.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";

dotenv.config({ path: ".env.test" });


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


const userEmail = "akshaimuraleedharan@gmail.com"



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
        await request(app).post("/api/v1/user/register").send({
            userName: "akshai",
            email: userEmail,
            password: "Akshai984"
        })

        const res = await request(app).post("/api/v1/user/register").send({
            userName: "akshai",
            email: userEmail,
            password: "Akshai984"
        })
        expect(res.statusCode).toBe(409);
    })

    let accessToken = null
    test("User Login", async () => {
        await request(app).post("/api/v1/user/register").send({
            userName: "akshai",
            email: userEmail,
            password: "Akshai984"
        })

        const res = await request(app).post("/api/v1/user/login").send({
            email: userEmail,
            password: "Akshai984"
        })


        accessToken = res.body.accessToken

        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body).toHaveProperty("accessToken");
        expect(typeof res.body.accessToken).toBe("string")
        expect(res.body.data.email).toBe(userEmail)
        expect(res.headers["set-cookie"]).toBeDefined();
    })

})
