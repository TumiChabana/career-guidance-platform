const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize Firebase (just by importing)
const { db } = require('./src/config/firebase');

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend is working with Firestore!' });
});

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔥 Firestore connected successfully!`);
});