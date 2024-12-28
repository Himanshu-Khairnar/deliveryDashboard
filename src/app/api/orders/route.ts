import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const orders = await Order.find();
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
    }
}
