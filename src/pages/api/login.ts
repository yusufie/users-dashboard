import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';

export default async function handleUserLogin(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Connect to the MongoDB database

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // Login successful
        res.status(200).json({ message: 'User login successful' });
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
