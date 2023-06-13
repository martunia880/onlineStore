const express = require('express');
const app = express();
require('./database/utils/connectDb.js');
const User = require('./database/models/user');
const Product = require('./database/models/product');
const Cart = require('./database/models/cart');
const { addUser } = require('./database/services/users/addUser.js');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/sass', express.static(__dirname + '/public/sass'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));

let products;
let product;

//do wyeksportowania
const shuffleArray = function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function createUniqueCategoriesArray(products) {
	var categories = [];
	
	for (var i = 0; i < products.length; i++) {
	var product = products[i];
	var category = product.category;

	if (categories.indexOf(category) === -1) {
		categories.push(category);
	}
	}
	
	return categories;
}


app.get('/', async function (req, res) {
	// Pobranie wszystkich produktów z bazy danych MongoDB
	products = await Product.find().exec();	






    // Wyrenderowanie szablonu .ejs z danymi produktów
    res.render('index', { products, shuffleArray });
});

app.get('/account', function (req, res) {
	res.render('account');
});

app.get('/form', function (req, res) {
	res.render('form', { products });
});

app.get('/cart', async function (req, res) {
	let cart = await Cart.find().exec();
	res.render('cart', { products, cart });
});

app.post('/cart', async function (req, res) {
	product = req.body.product;
	product = JSON.parse(product);
	console.log(product);



	let user = await User.findById('6478c075a46e33bd0d308a65');
	console.log(user);
	
	// Dodawanie produktu do koszyka nie po ID
	async function addProductToCart(product,user) {

		if (!user || !product) {
			throw new Error('Nie znaleziono użytkownika lub produktu');
		}else
		{
			let cartId = user.cart;
			console.log('cartId:', cartId);
			console.log('product._id:', product._id);
			
			let existingProduct = await Cart.findOne({
			  _id: cartId,
			  "products._id": product._id
			},{ "products.$": 1 });
			
			console.log('existingProduct:', existingProduct);
			
			
			if(existingProduct){
				// Produkt już znajduje się w koszyku, zwiększ quantityInCart o 1
				await Cart.findOneAndUpdate(
					{
					  _id: cartId,
					  'products._id': product._id
					},
					{ $inc: { 'products.$.quantityInCart': 1 } },
					{ new: true }
				  ).populate('products');
				  let cart = await Cart.find().exec();	
				  res.render('cart', { products, cart });
			}else{
				// Produkt nie istnieje w koszyku, dodaj go
				await Cart.findByIdAndUpdate(
					cartId,
					{ $push: { products: product } },
					{ new: true }).populate('products');
			}
			let cart = await Cart.find().exec();
			res.render('cart', { products, cart });	
		}
	}
	addProductToCart(product,user);
});

app.get('/contactus', (req, res) => {
	res.render('contactus', { products: products  });
  });

app.get('/products', async function (req, res) {

	res.render('products', { products, createUniqueCategoriesArray });
});

app.post('/product', async function (req, res) {
	let product = req.body.product;

	// console.log(serializedObjectProduct);
	product = JSON.parse(product);
	// console.log(product);


	res.render('product', {product,products});
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

app.post('/checkYourLoginDetails', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	login(email, password).then(async (npm) => {
		if (npm === true) {
			
			res.render('index', { products, message: 'udało się zalogować.', shuffleArray });
			

		} else {
			res.render('form', { alertLoginMessage: 'nie udało się zalogować.', products });
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
		res.render('form', { alertLoginMessage: 'Udało się zarejestrować.', positiveRegistration, alertLoginMessage2, products  });

		
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

