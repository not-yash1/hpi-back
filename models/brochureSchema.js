import mongoose from "mongoose";

const brochureSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    file: {
        public_id: {
            type: String,
            default: "No File"
        },
        url: {
            type: String,
            default: "No File"
        },
        assetId: {
            type: String,
            default: "No File"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Brochure = mongoose.model("Brochure", brochureSchema)