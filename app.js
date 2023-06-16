const express = require('express');
const app = express();
require('./database/utils/connectDb.js');
const User = require('./database/models/user');
const Product = require('./database/models/product');
const Cart = require('./database/models/cart');
const { addUser } = require('./database/services/users/addUser.js');
const { shuffleArray, createUniqueCategoriesArray, multiplyPriceAndQuantity} = require('./public/scripts/serverFunctions.js');
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/sass', express.static(__dirname + '/public/sass'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use(session({
	secret: 'sekretne_haslo',
	resave: false,
	saveUninitialized: false
  }));

let products;
let product;
let userSession;
let cart;

app.use((req, res, next) => {
	if (req.session) {
	  console.log('Dane sesji:', req.session); // Wyświetlenie danych sesji w konsoli
	}
	next();
});

app.use(async (req, res, next) => {
	if (req.path === '/addUserFromRegistration' || req.path === '/checkYourLoginDetails') {
		// Jeśli aktualny URL to '/login' lub '/register', przekaż kontrolę do następnego middleware
		next();
	} else if(req.session.userId == null){ // jeśli jest zalogowany uzytkownik (w sesji)
		res.render('form');	
	} else{
		next();
	}
});


app.get('/', async function (req, res) {
	// Pobranie wszystkich produktów z bazy danych MongoDB
	products = await Product.find().exec();	
	userSession = await User.findById(req.session.userId); // mozna te dwie linijki zamienić na jedną funkcję
	res.render('index', { products, shuffleArray, userSession });
});

app.get('/account', function (req, res) {
	res.render('account');
});

app.get('/form', function (req, res) {
	res.render('form');
});

app.get('/cart', async function (req, res) {
	userSession = await User.findById(req.session.userId);
	let cartId = userSession.cart;
	cart = await Cart.findById(cartId);
	res.render('cart', { products, cart, multiplyPriceAndQuantity });
}); 

app.post('/cart', async function (req, res) {
	product = req.body.product;
	product = JSON.parse(product);
	userSession = await User.findById(req.session.userId);
	// console.log(user);
	
	// Dodawanie produktu do koszyka nie po ID
	async function addProductToCart(product,user) {
		if (!userSession || !product) {
			throw new Error('Nie znaleziono użytkownika lub produktu');
		}else
		{
			let cartId = userSession.cart;
			// console.log('cartId:', cartId);
			// console.log('product._id:', product._id);
			let existingProduct = await Cart.findOne({
			  _id: cartId,
			  "products._id": product._id
			},{ "products.$": 1 });
			// console.log('existingProduct:', existingProduct);
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
				  cart = await Cart.findById(cartId);
				res.render('cart', { products, cart, multiplyPriceAndQuantity });
			}else{
				// Produkt nie istnieje w koszyku, dodaj go
				await Cart.findByIdAndUpdate(
					cartId,
					{ $push: { products: product } },
					{ new: true }).populate('products');
				cart = await Cart.findById(cartId);
				res.render('cart', { products, cart, multiplyPriceAndQuantity });
			}	
		}
	}
	addProductToCart(product,userSession);
}); 

app.post("/updateQuantity", async (req, res) => {
	const productId = req.body.productId;
	const quantity = req.body.quantity;
	userSession = await User.findById(req.session.userId);
	let cartId = userSession.cart;

	await Cart.findOneAndUpdate(
		{
		  _id: cartId,
		  'products._id': productId
		},
		{ $set: { 'products.$.quantityInCart': quantity } },
		{ new: true }
	  ).populate('products');
	  cart = await Cart.findById(cartId);
	  res.render('cart', { products, cart, multiplyPriceAndQuantity });
});

app.post("/removeProduct", async (req, res) => {
	const productId = req.body.productId;
	userSession = await User.findById(req.session.userId);
	let cartId = userSession.cart;

	await Cart.findOneAndUpdate(
		{
		  _id: cartId,
		  'products._id': productId
		},
		{ $pull: { products: { _id: productId } } },
		{ new: true }
	  ).populate('products');
	  cart = await Cart.findById(cartId);
	  res.render('cart', { products, cart, multiplyPriceAndQuantity });
});

app.get('/contactus', (req, res) => {
	res.render('contactus', { products: products  });
  });

app.get('/products', async function (req, res) {
	res.render('products', { products, createUniqueCategoriesArray });
});

app.post('/product', async function (req, res) {
	let product = req.body.product;
	product = JSON.parse(product);

	res.render('product', {product,products});
});

app.post('/checkYourLoginDetails', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

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

	login(email, password).then(async (npm) => {
		if (npm === true) {
			let userSession = await User.findOne({ email });
			// console.log(user);
			// console.log(user.name);
			// console.log(user._id);
			req.session.userId = userSession._id;
			const userId = req.session.userId;
			userSession = await User.findById(userId);
			products = await Product.find().exec();	
			res.render('index', { products, message: 'udało się zalogować.', shuffleArray, userSession, products });
		} else {
			res.render('form', { alertLoginMessage: 'nie udało się zalogować.'});
		}
	});
});

app.post('/addUserFromRegistration', async (req, res) => {
	const email = req.body.email;
	const password1 = req.body.password1;
	const password2 = req.body.password2;

	if (password1 == password2) {
		addUser(email, password1);
		console.log('Udało się Zarejestrować!');
		let positiveRegistration = true;
		const alertLoginMessage2 = "Teraz proszę się zalogować.";
		res.render('form', { alertLoginMessage: 'Udało się zarejestrować.', positiveRegistration, alertLoginMessage2});
	} else {
		console.log('nie udało się zarejestrować');
		res.render('form', {alertLoginMessage: 'Nie udało się zarejestrować.' });
	}
});


app.listen(5500, () => {
	console.log('Server is running on port 5500');
});