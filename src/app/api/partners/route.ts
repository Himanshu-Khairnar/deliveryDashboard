import { NextResponse } from 'next/server';
import connectDB from '@/Database/ConnectDB';
import { DeliveryPartner } from '@/Models/DeliveryPartern.model';

// Establish database connection
connectDB();

// Handler for GET requests
export async function GET() {
    try {
        const partners = await DeliveryPartner.find();
        return NextResponse.json(partners, { status: 200 });
    } catch (error) {
        console.error('Error fetching partners:', error);
        return NextResponse.json({ message: 'Error fetching partners' }, { status: 500 });
    }
}

// Handler for POST requests
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body)
        const partner = await DeliveryPartner.create(body);
        return NextResponse.json(partner, { status: 201 });
    } catch (error) {
        console.error('Error creating partner:', error);
        return NextResponse.json({ message: 'Error creating partner', error }, { status: 500 });
    }
}
