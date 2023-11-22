const router = require("express").Router()
const userController = require("../Controllers/user.controller")

router.post("/sign-up", userController.signUp)
router.post("/login", userController.login)
router.get("/:name", userController.getUser)

module.exports = router;