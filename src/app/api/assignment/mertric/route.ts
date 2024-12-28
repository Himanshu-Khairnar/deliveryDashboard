import connectDB from '@/Database/ConnectDB';
import { AssignmentMetrics } from '@/Models/AssignmentMetric.model';
import { NextResponse } from 'next/server';

connectDB();

export async function GET() {
    try {
        const metrics = await AssignmentMetrics.findOne(); 
        if (!metrics) {
            return NextResponse.json({ message: 'Metrics not found' }, { status: 404 });
        }
        return NextResponse.json(metrics, { status: 200 });
    } catch (error) {
        console.error('Error fetching metrics:', error);
        return NextResponse.json(
            { message: 'Error fetching metrics', error },
            { status: 500 }
        );
    }
}
