const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema ({
	appointmentId : {
		type: String,
		required : [true, "Firs Name is required"]
	},
	date : {
		type: String,
		required : [true, "Last Name is required"]
	},
	time : {
		type: String,
		required : [true, "Address is required"]
	},
	isAvailable : {
		type: Boolean,
		default : true,
		required : [true, "Contact Number is required"]
	}
})

module.exports = mongoose.model("Appointment", appointmentSchema);