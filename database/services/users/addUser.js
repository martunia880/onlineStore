require('../../utils/connectDb');
const User = require('../../models/user');

const createuser = async (data) => {
	try {
		const user = new User(data);
		await user.save();
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};



function addUser(name, email, password) {
  createuser({
    name: name,
    email: email,
    password: password
  });
}

addUser('Bartek34', 'trytytek6@icloud.com', 'LubczykKwitnący');

// async function getAllUsers() {
//   const MongoClient = require('mongodb').MongoClient;
//   const uri = 'mongodb://localhost:27017'; // Adres URL serwera MongoDB
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db('mydatabase'); // Nazwa bazy danych
//     const collection = database.collection('users'); // Nazwa kolekcji zawierającej użytkowników
//     const users = await collection.find({}).toArray();
//     return users;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await client.close();
//   }
// }
