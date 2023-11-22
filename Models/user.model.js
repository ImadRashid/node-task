const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: [true, "user with such name already exists!"], required: [true, "name is required"] },
    // since no authorization / access need we dont need anything else rather than a name and id of user.

})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel;