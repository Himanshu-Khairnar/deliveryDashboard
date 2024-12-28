// pages/api/assignments/run.js
import connectDB from '@/Database/ConnectDB';
import {Assignment} from '@/Models/Assignment.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    if (req.method === 'POST') {
        try {
            // Simulate an assignment algorithm
            const { orderId, partnerId } = req.body;
            const assignment = await Assignment.create({ orderId, partnerId, status: 'success', timestamp: new Date() });
            res.status(201).json(assignment);
        } catch (error) {
            res.status(500).json({ message: 'Error running assignment', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
