// pages/api/orders/assign.js
import connectDB from '@/Database/ConnectDB';
import {Order} from '@/Models/OrderPlace.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    if (req.method === 'POST') {
        try {
            const { orderId, partnerId } = req.body;
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { assignedTo: partnerId, status: 'assigned' }, { new: true });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Error assigning order', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
