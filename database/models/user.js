const mongoose = require('mongoose');
const Cart = require('./cart');
const internal = require('stream');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    default: "użytkownik"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  saldo: {
    type: Number,
    required: true,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    //required: true
  }
})

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.cart) {
    const cart = new Cart({ user: user._id, products: [] });
    cart.save()
      .then((savedCart) => {
        user.cart = savedCart._id;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;