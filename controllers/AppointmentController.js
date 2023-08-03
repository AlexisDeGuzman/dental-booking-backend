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

	    const availableTime = availableAppointments.map((appointment) => ({
            time: appointment.time,
            id: appointment._id
        }))

	    res.send(availableTime);
	} catch (error) {
	    console.error("Error getting all available schedule", error);
	    return res.status(500).send(error);
	}
};

// Create appointment
module.exports.createAppointment = async ( req, res ) => {
	const { date, time } = req.body;
	const { isAdmin } = auth.decode(req.headers.authorization);

	try {
    	if (!isAdmin) {
			return res.status(403).send(false);
    	}

    	const existingAppointment = await Appointment.findOne({ date, time});

    	if (existingAppointment) {
			return res.status(409).send(false);
    	}

    	const newAppointment = new Appointment({
    		date,
			time
    	});

    	await newAppointment.save();
    	return res.send(newAppointment);
	} catch (error) {
    	console.error("Error adding appointment:", error);
    	return res.status(500).send("Error adding appointment");
	}
}