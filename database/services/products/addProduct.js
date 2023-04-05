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

  addProduct('Klawiatura mechaniczna', 'Klawiatura z mechanicznymi przełącznikami', 250, 'Elektronika','<path>')

//   createProduct({
//     name: 'Klawiatura mechaniczna',
//     description: 'Klawiatura z mechanicznymi przełącznikami',
//     price: 250,
//     category: 'Elektronika'
//   });


