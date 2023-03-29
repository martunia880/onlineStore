require('../../utils/connectDb');
const User = require('../../models/user');

const deleteUser = async (userId) => {
	try {
		const result = await User.deleteOne({ _id: userId });
		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

deleteUser('64235e65de6776a076d56ce5');


