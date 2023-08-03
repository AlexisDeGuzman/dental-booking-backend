const Appointment = require("../models/AppointmentModel");
const auth = require("../auth");

// Retrieve available Time
module.exports.getAvailableTime = async (req, res) => {
	const { date } = req.body;

	try {
	    const appointments = await Appointment.find({ date });

	    if (appointments.length === 0) {
			// No appointments found for the given date
			return res.send(false);
	    }

	    const availableAppointments = appointments.filter((appointment) => {
			return appointment.isAvailable === true;
	    });

	    const availableTime = availableAppointments.map((appointment) => {
	    	return appointment.time;
	    })

	    res.send(availableTime);
	} catch (error) {
	    console.error("Error getting all available schedule", error);
	    return res.status(500).send(error);
	}
};