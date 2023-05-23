const express = require('express');
const app = express();
require('./database/utils/connectDb.js');
const User = require('./database/models/user');

const Product = require('./database/models/product');
const { addUser } = require('./database/services/users/addUser.js');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));




const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/sass', express.static(__dirname + '/public/sass'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));



//do wyeksportowania
const shuffleArray = function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
  }


app.get('/', async function (req, res) {
	// Pobranie wszystkich produktów z bazy danych MongoDB
	const products = await Product.find().exec();	






    // Wyrenderowanie szablonu .ejs z danymi produktów
    res.render('index', { products, shuffleArray });
});

app.get('/account', function (req, res) {
	res.render('account');
});

app.get('/form', function (req, res) {
	res.render('form');
});

app.get('/basket', function (req, res) {
	res.render('basket');
});

app.get('/products', async function (req, res) {
	const products = await Product.find().exec();	

	res.render('products', { products });
});

app.post('/product', function (req, res) {
	let product = req.body.product;

	// console.log(serializedObjectProduct);
	product = JSON.parse(product);
	// console.log(product);


	res.render('product', {product});
});

app.post('/product2', function (req, res) {
	console.log("pupu");
	const serializedObjectProduct = req.body.resultId;
	// const productQuantity = req.body.productQuantity;
	// const productPrice = req.body.productPrice;
	// const productDescription = req.body.productDescription;
	// const productPhotoPath = req.body.productPhotoPath;
	console.log(serializedObjectProduct);
	const product = JSON.parse(serializedObjectProduct);


	// res.render('product', {productName, productQuantity, productPrice, productDescription, productPhotoPath});
	res.render('product', {product});
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

	login(email, password).then(async (npm) => {
		if (npm === true) {
			//const users = [{ name: 'John' }, { name: 'Jane' }];
			const products = await Product.find().exec();
			res.render('index', { products, message: 'udało się zalogować.', shuffleArray });
			//res.render('index', { users: users});

		} else {
			res.render('form', { alertLoginMessage: 'nie udało się zalogować.' });
		}
	});
});

app.post('/addUserFromRegistration', async (req, res) => {
	// const name = req.body.name;
	const email = req.body.email;
	const password1 = req.body.password1;
	const password2 = req.body.password2;
	//let npm = false;

	if (password1 == password2) {
		addUser(email, password1);
		console.log('Udało się Zarejestrować!');
		let positiveRegistration = true;
		const alertLoginMessage2 = "Teraz proszę się zalogować.";
		res.render('form', { alertLoginMessage: 'Udało się zarejestrować.', positiveRegistration, alertLoginMessage2 });

		
		//npm = true;
	} else {
		console.log('nie udało się zarejestrować');
		const products =  await Product.find().exec();
		res.render('form', {alertLoginMessage: 'Nie udało się zarejestrować.' });
	}

	// if (npm === true) {
	// 	res.redirect('http://localhost:5500/form');
	// } else {
		
	// }

	//   res.send('Dane użytkownika zostały zapisane');
});





app.listen(5500, () => {
	console.log('Server is running on port 5500');
});

