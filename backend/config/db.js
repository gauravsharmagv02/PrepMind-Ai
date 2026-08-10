const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore DNS config warning if locked
}

let cachedConn = null;

const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables.');
  }

  mongoose.set('bufferCommands', true);

  cachedConn = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000
  });

  console.log('MongoDB connected successfully');
  return cachedConn;
};

module.exports = connectDB;
