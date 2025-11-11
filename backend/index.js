require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const campaignsRouter = require('./routes/campaigns');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignsRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Campaign Tracker Backend is running!');
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

// Connect to DB once when the function initializes
connectDB();

// ✅ Export the Express app for Vercel
module.exports = app;
