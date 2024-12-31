import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Import NextRequest for proper typing

connectDB();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const body = await req.json(); // Get the request body
        const { newStatus } = body; // Extract the newStatus from the body

        console.log(newStatus);

        // Update the order status
        const updatedOrder = await Order.findByIdAndUpdate(id, { status: newStatus }, { new: true });

        // Handle the case when the order is not found
        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        console.log(updatedOrder);
        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ message: 'Error updating order status', error }, { status: 500 });
    }
}
