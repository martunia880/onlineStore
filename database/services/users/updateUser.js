require('../../utils/connectDb');
const User = require('../../models/user');

const updateUser = async (userId, update) => {
	try {
		const user = await User.findByIdAndUpdate(userId, update, { new: true });
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};

updateUser('64235e65de6776a076d56ce5', { name: 'Nowe imię' });
