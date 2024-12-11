import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { farmer_id, incomeItem, incomeAmount, incomeRecDateTime, incomeCategory, remarks } = req.body;

    try {
      const db = await connectToDatabase();

      const newIncome = {
        farmer_id,
        incomeItem,
        incomeAmount: parseFloat(incomeAmount),
        incomeRecDateTime: new Date(incomeRecDateTime),
        incomeCategory,
        remarks,
        created_at: new Date(),
      };

      await db.connection.db.collection('income').insertOne(newIncome);

      res.status(201).json({ message: 'Income submitted successfully', newIncome });
    } catch (error) {
      console.error('Error submitting income:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
