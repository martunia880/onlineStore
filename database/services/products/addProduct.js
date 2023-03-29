require('../../utils/connectDb');
const Product = require('../../models/Product');

const createProduct = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};

export function addProduct(name, description, price, category) {
    createProduct({
        name: name,
        description: description,
        price: price,
        category: category
      });
  }

  addProduct('Klawiatura mechaniczna', 'Klawiatura z mechanicznymi przełącznikami', 250, 'Elektronika')

//   createProduct({
//     name: 'Klawiatura mechaniczna',
//     description: 'Klawiatura z mechanicznymi przełącznikami',
//     price: 250,
//     category: 'Elektronika'
//   });


