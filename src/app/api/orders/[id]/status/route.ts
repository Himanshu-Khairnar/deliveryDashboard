// pages/api/orders/[id]/status.js
import connectDB from '@/Database/ConnectDB';
import {Order} from '@/Models/OrderPlace.model';
import { NextResponse } from 'next/server';


connectDB();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const body = await req.json(); 
        const { status } = body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ message: 'Error updating order status', error }, { status: 500 });
    }
}
