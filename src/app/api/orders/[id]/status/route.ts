import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function PATCH(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;

    try {
        const body = await req.json();
        const { newStatus } = body;
        console.log(newStatus);

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json(
                { message: 'Order not found' },
                { status: 404 }
            );
        }

        console.log(updatedOrder);
        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { message: 'Error updating order status', error },
            { status: 500 }
        );
    }
}