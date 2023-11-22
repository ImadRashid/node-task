const { default: mongoose } = require("mongoose")
const MessageModel = require("../Models/message.model")
const UserModel = require("../Models/user.model")
const { failedResponse, successResponse } = require("../Utils/response-message")

const createMessage = async (req, res) => {
    const { name, message } = req.body
    if (!name) return failedResponse(res, null, "userId is undefined")
    if (!message) return failedResponse(res, null, "message is undefined")
    try {
        const user = await UserModel.findOne({ name })
        if (!user) return failedResponse(res, null, "No such user with this name found!")
        const messageData = await new MessageModel({
            userId: user._id,
            message
        }).save()
        successResponse(res, messageData, "Message posted successfully!")
    } catch (error) {
        failedResponse(res, error, error.message)
    }
}

const getMessage = async (req, res) => {
    const { id } = req.params;
    if (!id) return failedResponse(res, null, "id should be included in params!")
    try {
        const message = await MessageModel.findById(id).populate("userId").populate("likeBy")
        if (!message) return failedResponse(res, null, "no such message with an id found!")
        successResponse(res, message, "message data fetched!")
    } catch (error) {
        failedResponse(res, error, error.message)
    }
}

const userLikingMessage = async (req, res) => {
    const { userId, messageId } = req.body;
    if (!userId) return failedResponse(res, null, "userId is undefined!")
    try {
        const user = await UserModel.findById(userId)
        if (!user) return failedResponse(res, null, "no such user with an id found!")
        const message = await MessageModel.findByIdAndUpdate(messageId, { $inc: { like: 1 }, $push: { likeBy: new mongoose.Types.ObjectId(user._id) } }, { new: true })
        if (!message) return failedResponse(res, null, "No such message with an id found!")
        successResponse(res, message, `${user.name} liked a message : ${message._id}`)
    } catch (error) {
        failedResponse(res, error, error.message)
    }
}

module.exports = {
    userLikingMessage,
    getMessage,
    createMessage
}