const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isSubscribed:{type: Boolean, required:true, default:true},
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
