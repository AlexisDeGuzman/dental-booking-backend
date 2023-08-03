const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema ({
	date : {
		type: String,
		required : [true, "Date is required"]
	},
	time : {
		type: String,
		required : [true, "Time is required"]
	},
	isAvailable : {
		type: Boolean,
		default : true,
		required : [true, "Availability is required"]
	},
	note : {
		type: String
	}
})

module.exports = mongoose.model("Appointment", appointmentSchema);