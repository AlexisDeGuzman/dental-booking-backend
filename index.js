const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

// Import routes 
const userRoutes = require("./routes/userRoutes");

const app = express();

// Database connection
mongoose.connect(process.env.DB_URL,
		{
			useNewUrlParser : true,
			useUnifiedTopology : true
		}
	);
let db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection Error."));
db.once('open', () => console.log("Now connected to mongodb Atlas"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Route Registration
app.use("/users", userRoutes);

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`);
})