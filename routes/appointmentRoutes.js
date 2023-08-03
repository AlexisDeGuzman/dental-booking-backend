const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../auth")

// Retrieve available schedule
router.post("/availableTime", appointmentController.getAvailableTime);

module.exports = router;