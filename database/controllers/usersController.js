const { app, addUser } = require('../services/users/addUser');
const User = require('../models/user');

app.post('/addUserFromRegistration', (req, res) => {
	// const name = req.body.name;
	const email = req.body.email;
	const password1 = req.body.password1;
	const password2 = req.body.password2;
    let npm = false;

	if (password1 == password2) {
		addUser(email, password1);
		console.log('Udało się Zarejestrować!');
        npm = true;
	} else {
		console.log('nie udało się zarejestrować');
	}

    if (npm === true) {
        res.redirect('http://127.0.0.1:5500/form.html');
    } else {
        res.redirect('http://127.0.0.1:5500/index.html');
    }

	//   res.send('Dane użytkownika zostały zapisane');

});

const login = async (email, password) => {
	try {
		const user = await User.findOne({ email });

		if (user && user.password === password) {
			console.log('Udało się zalogować!');
			return true;
		} else {
			console.log('Nie udało się zalogować!');
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

app.post('/checkYourLoginDetails', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	login(email, password).then((npm) => {

		if (npm === true) {
			res.redirect('http://127.0.0.1:5500/index.html');
		} else {
			res.redirect('http://127.0.0.1:5500/form.html');
		}
	});
});

module.exports = app;
