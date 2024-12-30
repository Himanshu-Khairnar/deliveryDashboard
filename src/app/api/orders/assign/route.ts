import connectDB from '@/Database/ConnectDB';
import { Order } from '@/Models/OrderPlace.model';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            orderNumber,
            customer,
            area,
            items,
            scheduledFor,
            totalAmount,
            assignedTo // Add partnerNumber to the request body
        } = body;

        // Validation for required fields
        if (!orderNumber || !customer || !area || !items || !scheduledFor || !totalAmount || !assignedTo) {
            return NextResponse.json(
                { message: 'All fields are required, including partnerNumber' },
                { status: 400 }
            );
        }

        // Validate that items have required fields
        if (items.some((item: { name: string; quantity: number; price: number }) => !item.name || !item.quantity || !item.price)) {
            return NextResponse.json(
                { message: 'Each item must have name, quantity, and price' },
                { status: 400 }
            );
        }

        // Create the new order in the database, including partnerNumber
        const newOrder =await Order.create({
            orderNumber,
            customer,
            area,
            items,
            scheduledFor,
            totalAmount,
            assignedTo, 
            status: 'pending', 
        });


        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { message: 'Error creating order', error },
            { status: 500 }
        );
    }
}
