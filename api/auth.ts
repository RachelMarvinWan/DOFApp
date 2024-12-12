import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();

    // First, check in the Admin collection
    let user = await db.collection('Admin').findOne({ email });
    let role = 'admin';

    // If not found in Admin, check in Farmer collection
    if (!user) {
      user = await db.collection('Farmer').findOne({ email });
      role = 'farmer';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({
      role,
      message: 'Login successful',
      username: user.username,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
