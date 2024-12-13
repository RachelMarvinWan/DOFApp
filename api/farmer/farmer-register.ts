import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'lib/mongodb';
import Farmer from 'models/farmer';
import Admin from 'models/admin';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userID, username, email, password, organisation, admin_id } = req.body;

    try {
      // Connect to MongoDB
      await dbConnect();

      // Check if the email is already registered
      const existingFarmer = await Farmer.findOne({ email });
      if (existingFarmer) {
        return res.status(400).json({ error: 'Email is already registered.' });
      }

      // Check if the admin ID exists
      const admin = await Admin.findById(admin_id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new farmer document
      const newFarmer = await Farmer.create({
        userID,
        username,
        email,
        password: hashedPassword,
        organisation,
        registered_by: admin._id, // Reference to admin's ObjectID
        created_at: new Date(),
      });

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
