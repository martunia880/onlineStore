const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', UserSchema);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantityInStock: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String
  }
});

const Product = mongoose.model('Product', ProductSchema);

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = {
  User,
  Product,
  Cart
};












const mongoose = require('mongoose');
const { User, Product, Cart } = require('./models'); // Przyjmując, że modele są w pliku models.js

// Nawiązanie połączenia z bazą danych MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Połączono z bazą danych');
    // Dodanie użytkowników
    const user1 = new User({
      email: 'user1@example.com',
      password: 'password1',
      login: 'user1'
    });
    const user2 = new User({
      email: 'user2@example.com',
      password: 'password2',
      login: 'user2'
    });

    // Zapisanie użytkowników w bazie danych
    return Promise.all([user1.save(), user2.save()]);
  })
  .then((users) => {
    console.log('Dodano użytkowników:', users);

    // Dodanie produktów
    const product1 = new Product({
      name: 'Produkt 1',
      quantityInStock: 10,
      imageURL: 'https://example.com/product1.jpg'
    });
    const product2 = new Product({
      name: 'Produkt 2',
      quantityInStock: 5,
      imageURL: 'https://example.com/product2.jpg'
    });

    // Zapisanie produktów w bazie danych
    return Promise.all([product1.save(), product2.save(), users]);
  })
  .then(([product1, product2, users]) => {
    console.log('Dodano produkty:', product1, product2);

    // Dodanie produktów do koszyka użytkowników
    const user1 = users[0];
    const user2 = users[1];

    const cart1 = new Cart({
      user: user1._id,
      products: [
        {
          product: product1._id,
          quantity: 2
        },
        {
          product: product2._id,
          quantity: 1
        }
      ]
    });

    const cart2 = new Cart({
      user: user2._id,
      products: [
        {
          product: product1._id,
          quantity: 3
        }
      ]
    });

    // Zapisanie koszyków w bazie danych
    return Promise.all([cart1.save(), cart2.save()]);
  })
  .then((carts) => {
    console.log('Dodano koszyki:', carts);
    // Zakończenie połączenia z bazą danych
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Błąd:', error);
  });