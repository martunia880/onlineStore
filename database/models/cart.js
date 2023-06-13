const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        name: {
            type: String,
            required: true
        },
        quantityInCart: {
          type: Number,
          default: 1
        },
        description: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        category: {
          type: String,
          required: true
        },
        photoPath: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ]
  });
  
  const Cart = mongoose.model('Cart', CartSchema);

  module.exports = Cart;
  