const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log('[Database] MONGODB_URI not provided. Running in resilient In-Memory Store mode.');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('✓ Successfully connected to MongoDB Atlas (Sunshade Solutions)');
    return true;
  } catch (err) {
    console.warn('⚠ MongoDB connection failed, falling back to in-memory store:', err.message);
    isConnected = false;
    return false;
  }
}

function getDbStatus() {
  return isConnected;
}

module.exports = { connectDB, getDbStatus };
