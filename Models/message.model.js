const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    like: { type: Number, default: 0 },
    likeBy: [{ type: mongoose.Types.ObjectId, ref: "user", default: [] }],
    message: { type: String, require: true }
})

const MesssageModel = mongoose.model("message", MessageSchema)

module.exports = MesssageModel;