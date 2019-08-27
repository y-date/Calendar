const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  age: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;