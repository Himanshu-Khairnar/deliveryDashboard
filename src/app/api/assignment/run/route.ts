import connectDB from '@/Database/ConnectDB';
import { Assignment } from '@/Models/Assignment.model';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(req: Request) {
    try {
        const body = await req.json(); 
        const { orderId, partnerId,status ,reason} = body;

        if (!orderId || !partnerId) {
            return NextResponse.json(
                { message: 'Order ID and Partner ID are required' },
                { status: 400 }
            );
        }

        const assignment = await Assignment.create({
            orderId,
            partnerId,
            status,
            timestamp: new Date(),
            reason
        });

         NextResponse.json(assignment, { status: 201 });
    } catch (error) {
        console.error('Error running assignment:', error);
        return NextResponse.json(
            { message: 'Error running assignment', error },
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
