import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true,
    },
    visitHistory: [{ timestamp: { type: Number}}],
}, {timestamp: true})

export const URL = mongoose.model('url', urlSchema)