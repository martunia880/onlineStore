require('../../utils/connectDb');
const Product = require('../../models/Product');

const updateProduct = async (productId, data) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, data, { new: true });
    console.log(`Zaktualizowano produkt o nazwie ${product.name}`);
  } catch (error) {
    console.log(error);
  }
};

updateProduct('6423819b5382803411887da3', { name: 'Gitara akurstyczna', price: 300 }); 
