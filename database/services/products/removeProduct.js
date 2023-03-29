require('../../utils/connectDb');
const Product = require('../../models/Product');

const removeProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    console.log(`Usunięto produkt o nazwie ${product.name}`);
  } catch (error) {
    console.log(error);
  }
};

removeProduct('6423819b5382803411887da3'); 
