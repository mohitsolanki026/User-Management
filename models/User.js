const mongoose = require('mongoose');
const uuid = require('uuid');


const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: () => uuid.v4(),
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_image: {
    type: String,
  }, 
  total_orders: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_logged_in: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);

