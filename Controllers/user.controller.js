const UserModel = require("../Models/user.model");
const { successResponse, failedResponse } = require("../Utils/response-message");

const signUp = async (req, res) => {
    const { name } = req.body;
    if (!name) return failedResponse(res, null, "name field is undefined!")
    try {
        const user = await new UserModel({
            name
        }).save()
        return successResponse(res, user, "User successfully created!")
    } catch (error) {
        return failedResponse(res, error, error.message)
        // createError is util function
    }
}

const login = async (req, res) => {
    const { name } = req.body;
    if (!name) return failedResponse(res, null, "name field is undefined!")

    try {
        const user = await UserModel.findOne({ name })
        successResponse(res, user, "User signed in!")
    } catch (error) {
        failedResponse(res, error, error.message)
    }
}

const getUser = async (req, res) => {
    const { name } = req.params;
    if (!name) return failedResponse(res, null, "name field is undefined!")

    try {
        const user = await UserModel.findOne({ name })
        successResponse(res, user, "User found!")
    } catch (error) {
        failedResponse(res, error, error.message)
    }
}

module.exports = {
    getUser,
    signUp,
    login
}