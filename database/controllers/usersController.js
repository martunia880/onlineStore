const { app, addUser } = require('../services/users/addUser');
const User = require('../models/user');

app.post('/addUserFromRegistration', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	addUser(name, email, password);

	//   res.send('Dane użytkownika zostały zapisane');

	res.redirect('http://127.0.0.1:5500/index.html');
});

const login = async (name, password) => {
	try {
		const user = await User.findOne({ name });

		if (user && user.password === password) {
			console.log('Udało się zalogować!');
		} else {
			console.log('Nie udało się zalogować!');
		}
	} catch (error) {
		console.log(error);
	}
};

app.post('/checkYourLoginDetails', (req, res) => {
	const name = req.body.name;
	const password = req.body.password;

	login(name, password);

	res.redirect('http://127.0.0.1:5500/index.html');
});

module.exports = app;
