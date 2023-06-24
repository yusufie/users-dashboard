import mongoose from 'mongoose';

const MONGODB_URI  = process.env.MONGODB_URI as any;

async function connectDB() {
  try {
    await mongoose.connect(`${MONGODB_URI}usersdata`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectDB;
