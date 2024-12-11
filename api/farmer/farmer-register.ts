import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userID, username, email, password, organisation, admin_id } = req.body;

    try {
      const db = await connectToDatabase();

      // Check if the email is already registered
      const existingFarmer = await db.connection.db.collection('farmer').findOne({ email });
      if (existingFarmer) {
        return res.status(400).json({ error: 'Email is already registered.' });
      }

      // Check if the admin ID exists in the admin collection
      const admin = await db.collection('admin').findOne({ _id: new mongoose.Types.ObjectId(admin_id) });
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new farmer document
      const newFarmer = {
        userID,
        username,
        email,
        organisation,
        password: hashedPassword,
        registered_by: new mongoose.Types.ObjectId(admin_id), // Reference to admin's ObjectID
        created_at: new Date(),
      };

      await db.connection.db.collection('farmer').insertOne(newFarmer);

      res.status(201).json({ message: 'Farmer registered successfully', farmer: newFarmer });
    } catch (error) {
      console.error('Error registering farmer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
