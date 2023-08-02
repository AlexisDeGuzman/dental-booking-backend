const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const auth = require("../auth");

// register 
module.exports.registerUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send('All fields must be filled');
	}

	if (!validator.isEmail(email)) {
		return res.status(400).send('Email is not valid');
	}

	if (!validator.isStrongPassword(password)) {
		return res.status(400).send('Strong Password Required: Minimum 8 characters, 1 number, 1 capital letter, 1 special character.');
	}

	try {
		const exist = await User.findOne({ email });
		if ( exist ) {
			return res.status(400).send('Email already in use');
		}

		const newUser = new User ({
			...req.body,
			password: bcrypt.hashSync(password, 10)
		})

		const savedUser = await newUser.save();
		res.send(savedUser);
	} catch (error) {
		res.status(500).send(error.message);
	}

}


// login
module.exports.loginUser = (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send('All fields must be filled');
	}

	return User.findOne({email}).then(result => {

		// User does not exist
		if(result == null){
			console.log("User does not exist");
			res.status(404).send("User does not exist"); 

		// User exists
		} else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			// If the password matches
			if(isPasswordCorrect){
				res.send({ access: auth.createAccessToken(result)}); 
			} else {
				console.log("Password did not match");
				res.status(401).send("Password did not match");
			}
		}
	})
};