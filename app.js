const express = require('express');
const app = express();
require('./database/utils/connectDb.js');
const User = require('./database/models/user');

const Product = require('./database/models/product');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));




const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/sass', express.static(__dirname + '/public/sass'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));


app.get('/', async function (req, res) {
	// Pobranie wszystkich produktów z bazy danych MongoDB
    const products = await Product.find().exec();

    // Wyrenderowanie szablonu .ejs z danymi produktów
    res.render('index', { products });
});

app.get('/form', function (req, res) {
	res.render('form');
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
            const users = [{ name: 'John' }, { name: 'Jane' }];
			res.render('index', { users: users });
		} else {
			res.render('form');
		}
	});
});





app.listen(5500, () => {
	console.log('Server is running on port 5500');
});

