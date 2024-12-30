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
            totalAmount
        } = body;

        // Validation for required fields
        if (!orderNumber || !customer || !area || !items || !scheduledFor || !totalAmount) {
            return NextResponse.json(
                { message: 'All fields are required' },
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

        // Create the new order in the database
        const newOrder = new Order({
            orderNumber,
            customer,
            area,
            items,
            scheduledFor,
            totalAmount,
            status: 'pending', // Initial status as pending
        });

        await newOrder.save();

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { message: 'Error creating order', error },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { orderId, partnerId } = body;

        // Validate input
        if (!orderId || !partnerId) {
            return NextResponse.json(
                { message: 'Order ID and Partner ID are required' },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json(
                { message: 'Order not found' },
                { status: 404 }
            );
        }

        order.assignedTo = partnerId;
        order.status = 'assigned';
        await order.save();

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error('Error assigning delivery partner:', error);
        return NextResponse.json(
            { message: 'Error assigning delivery partner', error },
            { status: 500 }
        );
    }
}