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
let cookies = null




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



    test("User Login", async () => {

        const res = await request(app).post("/api/v1/user/login").send({
            email: userEmail,
            password: "Akshai984"
        })


        token = res.body.accessToken

        cookies = res.headers["set-cookie"][0].split(";")[0]


        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body).toHaveProperty("accessToken");
        expect(typeof res.body.accessToken).toBe("string")
        expect(res.body.data.email).toBe(userEmail)
        expect(res.headers["set-cookie"]).toBeDefined();

    })

    test("new access token", async () => {
        const res = await request(app).get("/api/v1/user/refresh-token").set("Cookie", cookies)


        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Access token created successfully")
        expect(res.body.accessToken).toBeDefined()
        expect(typeof res.body.accessToken).toBe("string");

    })

    test("Account logout", async () => {
        const res = await request(app).post("/api/v1/user/logout").set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
        // expect(res.body.message).toBe("Logged out successfully")

    })


})





