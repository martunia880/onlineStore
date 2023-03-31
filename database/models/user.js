const mongoose = require('mongoose');
const internal = require('stream');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    default: "użytkownik"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  saldo: {
    type: Number,
    required: true,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
})

const User = mongoose.model('User', userSchema);

module.exports = User;