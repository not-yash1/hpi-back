import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mob: {
        type: Number,
    },
    message: [
        {
            msg: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    brochures: [
        {
            type: String
        }
    ],
})

export const User = mongoose.model("User", userSchema);