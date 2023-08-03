const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
	firstName : {
		type: String,
		required : [true, "Firs Name is required"]
	},
	lastName : {
		type: String,
		required : [true, "Last Name is required"]
	},
	address : {
		type: String,
		required : [true, "Address is required"]
	},
	contactNumber : {
		type: String,
		required : [true, "Contact Number is required"]
	},
	email : {
		type: String,
		required : [true, "Email is required"]
	},
	password : {
		type: String,
		required : [true, "Email is required"]
	},
	isAdmin : {
		type: Boolean,
		default : false,
		required : [true, "isAdmin is required"]
	},
	appointments: [
		{
			appointmentId: {
				type: String,
				required : [true, "Appointment ID is required"]
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);