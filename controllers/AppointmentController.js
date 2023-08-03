const Appointment = require("../models/AppointmentModel");
const auth = require("../auth");

module.exports.getAvailableSchedule = async (req, res) => {
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

	    res.send(availableAppointments);
	} catch (error) {
	    console.error("Error getting all available schedule", error);
	    return res.status(500).send(error);
	}
};