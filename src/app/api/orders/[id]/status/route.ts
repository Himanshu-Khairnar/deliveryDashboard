import {  NextRequest, NextResponse } from 'next/server'; // Import NextRequest and NextResponse
import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';
import { useParams } from 'next/navigation'

connectDB();
export async function PUT(req: NextRequest) {
    const params = useParams<{ id:string}>()
    const {id} = params
    try {
        const body = await req.json(); 
        const { newStatus } = body; 

        const updatedOrder = await Order.findByIdAndUpdate(id, { status: newStatus }, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ message: 'Error updating order status', error }, { status: 500 });
    }
}

