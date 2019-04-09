import mongoose from 'mongoose';

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, options);
};

export {
  connectDb
};
