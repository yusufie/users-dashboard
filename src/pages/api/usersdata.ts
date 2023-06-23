import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Connect to the MongoDB database

  if (req.method === 'GET') {
    // Fetch all users
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
    }

  } else if (req.method === 'PUT') {
    // Update a user
    try {
      const { fullName, email, phone, age, password, role, status, userId } = req.body;
      const updatedUser = { fullName, email, phone, age, password, role, status };

      const db = mongoose.connection.db; // Obtain the MongoDB database object

      const result = await db.collection('users').updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $set: updatedUser }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('User updated:', result);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }

  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}