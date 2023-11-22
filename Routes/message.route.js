const router = require("express").Router()
const messageController = require("../Controllers/message.controller")

router.post("/", messageController.createMessage)
router.get("/:id", messageController.getMessage)
router.patch("/like", messageController.userLikingMessage)

module.exports = router;