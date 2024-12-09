import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env.local file");
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { authSource: 'admin' });
  }
};

export default connectToDatabase;
