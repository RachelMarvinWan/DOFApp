import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { farmer_id } = req.query;

  try {
    const db = await connectToDatabase();

    // Fetch income and expenses for the specified farmer
    const income = await db.connection.db.collection('income').find({ farmer_id }).toArray();
    const expenses = await db.connection.db.collection('expenses').find({ farmer_id }).toArray();

    res.status(200).json({ income, expenses });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
