// pages/api/partners/index.js
import connectDB from '@/Database/ConnectDB';
import {DeliveryPartner} from '@/Models/DeliveryPartern.model';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    if (req.method === 'GET') {
        try {
            const partners = await DeliveryPartner.find();
            res.status(200).json(partners);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching partners' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

    if (req.method === 'POST') {
        try {
            const partner = await DeliveryPartner.create(req.body);
            res.status(201).json(partner);
        } catch (error) {
            res.status(500).json({ message: 'Error creating partner', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
