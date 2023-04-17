const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Database
const database = (module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	try {
		mongoose.connect(
			'mongodb+srv://damianbugaj6:hubsas-wikcyf-2Nocqo@onlinestore.x6wtlxd.mongodb.net/?retryWrites=true&w=majority',
			connectionParams
		);
		console.log('Database connected succesfully');
	} catch (error) {
		console.log(error);
		console.log('Database connection failed');
	}
});

database();

module.exports = app;

