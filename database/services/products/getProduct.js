require('../../utils/connectDb');
const Product = require('../../models/Product');

export const getProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};

getProduct('6423819b5382803411887da3'); 
