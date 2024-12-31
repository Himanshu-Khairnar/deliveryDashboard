import connectDB from '@/Database/ConnectDB';
import { Assignment } from '@/Models/Assignment.model';
import { NextResponse } from 'next/server';

connectDB();


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderId, partnerId, status, reason } = body;

        // Basic validation
        if (!orderId || !partnerId) {
            return NextResponse.json(
                { message: 'Order ID and Partner ID are required' },
                { status: 400 }
            );
        }

        // Validate status and reason
        if (status === 'failed' && !reason) {
            return NextResponse.json(
                { message: 'Reason is required if status is "failed"' },
                { status: 400 }
            );
        }

        // Create assignment
        const assignment = await Assignment.create({
            orderId,
            partnerId,
            status,
            timestamp: new Date(),
            reason: status === 'failed' ? reason : null, // Ensure reason is null if not failed
        });

        return NextResponse.json(assignment, { status: 201 });
    } catch (error) {
        console.error('Error creating assignment:', error);

        return NextResponse.json(
            { message: 'Internal Server Error', error: error },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        const res = await Assignment.find();

        if (!res) {
            return NextResponse.json(
                { message: "Error while fetching assignments" },
                { status: 500 }
            );
        }

        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/assignment/run:', error);
        return NextResponse.json(
            { message: "Internal server error", error: error },
            { status: 500 }
        );
    }
}
