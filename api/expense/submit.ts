import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { farmer_id, expenseItem, expenseAmount, expRecDateTime, expCategory, remarks } = req.body;

    try {
      const db = await connectToDatabase();

      const newExpense = {
        farmer_id,
        expenseItem,
        expenseAmount: parseFloat(expenseAmount),
        expRecDateTime: new Date(expRecDateTime),
        expCategory,
        remarks,
        created_at: new Date(),
      };

      await db.collection('expenses').insertOne(newExpense);

      res.status(201).json({ message: 'Expense submitted successfully', newExpense });
    } catch (error) {
      console.error('Error submitting expense:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
