const shuffleArray = function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function createUniqueCategoriesArray(products) {
	var categories = [];
	
	for (var i = 0; i < products.length; i++) {
	var product = products[i];
	var category = product.category;

	if (categories.indexOf(category) === -1) {
		categories.push(category);
	}
	}
	
	return categories;
}

function multiplyPriceAndQuantity(price, quantity) {
	return price * quantity;
}

module.exports = {
    shuffleArray,
    createUniqueCategoriesArray,
    multiplyPriceAndQuantity
  };