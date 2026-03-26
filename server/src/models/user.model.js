import mongoose from "mongoose"
import bcryptjs from "bcryptjs"


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    tradeCapital: {
        type: Number,
        min: 0,
        default: 0
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    const user = this

    if (!this.isModified('password')) return
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)

})

userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcryptjs.compare(enterdPassword, this.password)
}

export const User = mongoose.model("User", userSchema)