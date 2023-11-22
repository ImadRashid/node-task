const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const messageRoute = require("./Routes/message.route")
const userRoute = require("./Routes/user.route")

const MONGO_URI = process.env.DATABASE_URI
const PORT = process.env.PORT;
const app = express()


app.use(express.json())
app.use("/message", messageRoute)
app.use("/user", userRoute)

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log("Error connecting to a DB")
        console.log(error)
    }
}

app.use("*", (req, res) => {
    res.status(404).send("Not found!")
})


app.listen(PORT, async (error) => {
    if (error) console.log(error)
    // run function for db
    console.log("server running on port : ", PORT)
    await connectDB()
})

