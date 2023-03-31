require('../../utils/connectDb');
const express = require('express');
const User = require('../../models/user');
const app = require('../../utils/connectDb');

const createuser = async (data) => {
	try {
		const user = new User(data);
		await user.save();
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};

function addUser(name, email, password) {
	createuser({
		name: name,
		email: email,
		password: password,
	});
}

app.use(express.urlencoded({ extended: true }));

module.exports = {
	app,
	addUser,
};

// addUser('damian','damy3@wp.pl','Haseleczko23');