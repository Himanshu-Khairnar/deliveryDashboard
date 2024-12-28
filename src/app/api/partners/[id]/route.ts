// pages/api/partners/[id].js
import connectDB from '@/Database/ConnectDB';
import {DeliveryPartner} from '@/Models/DeliveryPartern.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const updatedPartner = await DeliveryPartner.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(updatedPartner);
        } catch (error) {
            res.status(500).json({ message: 'Error updating partner', error });
        }
    } else if (req.method === 'DELETE') {
        try {
            await DeliveryPartner.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting partner', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
