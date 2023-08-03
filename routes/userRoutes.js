const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth")

// register
router.post("/register", userController.registerUser);

// login
router.post("/login", userController.loginUser);

// retrieve user details
router.get("/userDetails", auth.verify, userController.getUserDetails);

module.exports = router;