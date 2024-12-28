// pages/api/orders/index.js
import connectDB from '@/Database/ConnectDB';
import {Order} from '@/Models/OrderPlace.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    if (req.method === 'GET') {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
