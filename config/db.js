require('dotenv').config();
const mongoose = require('mongoose');
// console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line to check the value
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;