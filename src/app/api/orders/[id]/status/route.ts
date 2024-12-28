// pages/api/orders/[id]/status.js
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/Database/ConnectDB';
import {Order} from '@/Models/OrderPlace.model';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { status } = req.body;
            const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Error updating order status', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
