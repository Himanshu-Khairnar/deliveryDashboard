import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest and NextResponse
import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';

connectDB(); // Connect to the database

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const body = await req.json(); // Parse the request body
        const { newStatus } = body; // Extract newStatus from the request body

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(id, { status: newStatus }, { new: true });

        // If the order is not found
        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        // Return the updated order
        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ message: 'Error updating order status', error }, { status: 500 });
    }
}
