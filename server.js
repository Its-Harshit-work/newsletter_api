const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import connectDB
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB(); // Call the function to connect to MongoDB

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware (Optional if added)
const { errorHandler } = require('./middlewares/authMiddleware');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
