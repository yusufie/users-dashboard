
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';

export default async function handleUserCreate(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Connect to the MongoDB database

  if (req.method === 'POST') {
    const { fullName, email, phone, age, password } = req.body;
    if (fullName && email && phone && age && password) {
      try {
        const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

        const newUser = new User({ fullName, email, phone: formattedPhone, age, password });
        await newUser.save();

        res.status(200).json(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
      }
    } else {
      res.status(400).json({ error: 'Invalid request payload' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
