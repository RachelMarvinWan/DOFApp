import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'lib/mongodb';
import farmer from 'models/farmer';
import admin from 'models/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        let user = await farmer.findOne({ email, password }); // Replace with password hashing logic
        let role = 'farmer';

        if (!user) {
            user = await admin.findOne({ email, password }); // Replace with password hashing logic
            role = 'admin';
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        // Respond with user info and role
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { id: user._id, name: user.name, role },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
}
