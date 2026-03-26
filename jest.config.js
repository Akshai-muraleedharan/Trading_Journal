export default {
    testEnvironment: "node",
    transform: {},

    // 🔥 THIS IS THE FIX
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],

    testPathIgnorePatterns: ["/node_modules/", "/examples"]
};;