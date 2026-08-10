const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/prepmindai';
    
    // Set bufferCommands to false so operations fail fast if DB is disconnected
    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`⚡ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Server will attempt operating with fallback data store where applicable.');
    return null;
  }
};

module.exports = connectDB;
