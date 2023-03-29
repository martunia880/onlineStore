require('../../utils/connectDb');
const User = require('../../models/user');

const getUser = async (userId) => {
	try {
		const user = await User.findById(userId);
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};




getUser('64237faa5cfd9c90012e2f04');




