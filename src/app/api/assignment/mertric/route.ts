// pages/api/assignments/metrics.js
import connectDB from '@/Database/ConnectDB';
import {AssignmentMetrics} from '@/Models/AssignmentMetric.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connectDB();

    if (req.method === 'GET') {
        try {
            const metrics = await AssignmentMetrics.findOne(); // Assuming there's a single metrics document
            res.status(200).json(metrics);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching metrics', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
