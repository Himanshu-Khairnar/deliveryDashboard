import connectDB from '@/Database/ConnectDB';
import { AssignmentMetrics } from '@/Models/AssignmentMetric.model';
import { NextResponse } from 'next/server';

type AssignmentMetrics = {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
        reason:
        string; count: number;
    }[];
}

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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { totalAssigned, successRate, averageTime, failureReasons } = body;

        let metrics = await AssignmentMetrics.findOne();
        if (metrics) {
            // Update existing metrics
            metrics.totalAssigned = totalAssigned ?? metrics.totalAssigned;
            metrics.successRate = successRate ?? metrics.successRate;
            metrics.averageTime = averageTime ?? metrics.averageTime;
            metrics.failureReasons = failureReasons ?? metrics.failureReasons;

            await metrics.save();
        } else {
            // Create new metrics
            metrics = await AssignmentMetrics.create({
                totalAssigned,
                successRate,
                averageTime,
                failureReasons,
            });
        }

        // Return the updated or newly created metrics
        return NextResponse.json(metrics, { status: 201 });
    } catch (error) {
        console.error('Error saving metrics:', error);
        return NextResponse.json(
            { message: 'Failed to save metrics', error: error },
            { status: 500 }
        );
    }
}
