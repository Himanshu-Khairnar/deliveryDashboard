import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';
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

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { assignedTo: partnerId, status: 'assigned' },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Error assigning order:', error);
        return NextResponse.json(
            { message: 'Error assigning order', error },
            { status: 500 }
        );
    }
}
