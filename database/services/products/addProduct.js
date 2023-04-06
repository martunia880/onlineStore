// require('../../../app');
require('../../utils/connectDb');
const Product = require('../../models/product');

const createProduct = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};

function addProduct(name, description, price, category, photoPath) {
    createProduct({
        name: name,
        description: description,
        price: price,
        category: category,
        photoPath: photoPath
      });
  }

//   addProduct('Klawiatura mechaniczna', 'Klawiatura z mechanicznymi przełącznikami', 600, 'Elektronika','<path>')
//   addProduct('Głośniczek', 'głośny', 100, 'Elektronika','<path>')
//   addProduct('słuchawki', 'głośne', 100, 'Elektronika','<path>')
//   addProduct('telefon', 'szybki', 600, 'Elektronika','<path>')


//   createProduct({
//     name: 'Klawiatura mechaniczna',
//     description: 'Klawiatura z mechanicznymi przełącznikami',
//     price: 250,
//     category: 'Elektronika'
//   });


