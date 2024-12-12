import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const db = await connectToDatabase(); // Returns the MongoDB database instance
    const adminCollection = db.collection('admin');

    // Find admin by email
    const admin = await adminCollection.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Successful login
    return res.status(200).json({
      message: 'Login successful',
      email: admin.email,
      password: admin.password,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


