import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const db = await connectToDatabase(); // Returns the MongoDB database instance
    const adminCollection = db.collection('admin'); // Replace 'admin' with your collection name if different

    // Find admin by email
    const admin = await adminCollection.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({ role: admin.role });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

