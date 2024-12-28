import connectDB from '@/Database/ConnectDB';
import { Assignment } from '@/Models/Assignment.model';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(req: Request) {
    try {
        const body = await req.json(); 
        const { orderId, partnerId } = body;

        if (!orderId || !partnerId) {
            return NextResponse.json(
                { message: 'Order ID and Partner ID are required' },
                { status: 400 }
            );
        }

        const assignment = await Assignment.create({
            orderId,
            partnerId,
            status: 'success',
            timestamp: new Date(),
        });

        return NextResponse.json(assignment, { status: 201 });
    } catch (error) {
        console.error('Error running assignment:', error);
        return NextResponse.json(
            { message: 'Error running assignment', error },
            { status: 500 }
        );
    }
}
