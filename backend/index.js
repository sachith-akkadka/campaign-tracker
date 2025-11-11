require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const campaignsRouter = require('./routes/campaigns');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins (for dev). Replace with frontend URL in production if needed.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignsRouter);

// Health check route (important for Vercel)
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
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
