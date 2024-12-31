import connectDB from '@/Database/ConnectDB';
import { DeliveryPartner } from '@/Models/DeliveryPartern.model';
import { NextResponse } from 'next/server';

connectDB();

export async function PATCH(req: Request, context: { params: { id: string } }) {


    try {
        const { id } = await context.params;
        const body = await req.json();
        const updatedPartner = await DeliveryPartner.findByIdAndUpdate(id, body, { new: true });
        if (!updatedPartner) {
            return NextResponse.json({ message: 'Partner not found' }, { status: 404 });
        }
        return NextResponse.json(updatedPartner, { status: 200 });
    } catch (error) {
        console.error('Error updating partner:', error);
        return NextResponse.json({ message: 'Error updating partner', error }, { status: 500 });
    }
}

export async function DELETE( { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedPartner = await DeliveryPartner.findByIdAndDelete(id);
        if (!deletedPartner) {
            return NextResponse.json({ message: 'Partner not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Partner deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting partner:', error);
        return NextResponse.json({ message: 'Error deleting partner', error }, { status: 500 });
    }
}


export async function GET( { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        const data = await DeliveryPartner.findById(id)
        if(!data)
          return  NextResponse.json({message:"Error in getting specific partner"})
        return NextResponse.json({data,message:"Successfully got partner"})
    } catch (error) {
        console.log(error)
    }
}