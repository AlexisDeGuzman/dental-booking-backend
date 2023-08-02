const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

// Create Token
module.exports.createAccessToken = (user) => {
	// When the user logs in, a token will be created with the user's information
	const data = {
		id : user._id,
		email: user.email,
		isAdmin : user.isAdmin
	};

	// Generate a JSON web token using the jwt's sign method
	return jwt.sign(data, secret, {});
};

// Token verification
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	// Token recieved and is not undefined
	if (typeof token !== "undefined"){

		console.log(token);

		token = token.slice(7, token.length)

		// Validate the token using the "verify" method decrypting the token using the secret code
		return jwt.verify(token, secret, (err, data) => {

			// If JWT is not valid
			if (err) {
				return res.send({auth : "failed"})
			} else {
				next();
			}
		})
	// Token does not exist
	} else {
		return res.send({auth : "failed"});
	};
};

// Token decryption
module.exports.decode = (token) => {

	// Token recieved and is not undefined
	if(typeof token !== "undefined"){

		// Retrieves only the token and removes the "Bearer" prefix
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {

			if(err){
				return null;

			} else {
				return jwt.decode(token, {complete:true}).payload;
			}
		})
	// Token does not exist
	} else {
		return null
	};
};