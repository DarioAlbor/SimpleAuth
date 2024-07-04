const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgProfile: {
    type: String,
    default: '',
  },
  isactive: {
    type: String,
    default: 'false',
  },
});

module.exports = mongoose.model('User', userSchema);