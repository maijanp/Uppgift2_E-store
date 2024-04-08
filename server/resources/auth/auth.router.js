const express = require("express")
const {registerUser, login, logout, authorize, checkLoginStatus} = require('./auth.controller')
const router = express.Router()

router.get("/check-login", checkLoginStatus)
router.post("/register", registerUser)
router.post("/login", login)
router.post("/logout", logout)
router.get("/authorize", authorize)

module.exports = router