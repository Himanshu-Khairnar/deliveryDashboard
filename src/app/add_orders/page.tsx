'use client';
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getpartner } from "@/actions/partner.actions";
import { putData } from "@/actions/order.actions";

type Partner = {
    _id: string;
    name: string;
};



const Page = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            orderNumber: '',
            customer: {
                name: "",
                phone: "",
                address: "",
            },
            area: '',
            scheduledFor: '',
            assignedTo: '',
            items: [{ name: "", quantity: 0, price: 0 }],
        },
    });
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await getpartner();
                setPartners(data);
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };

        fetchPartners();
    }, []);

    const onSubmit = async (data: FieldValues) => {
        const formData = {
            orderNumber: data.orderNumber,
            customer: {
                name: data.customer.name,
                phone: data.customer.phone,
                address: data.customer.address,
            },
            status: 'pending' as const,
            area: data.area,
            items: data.items,
            scheduledFor: data.scheduledFor,
            totalAmount: data.items.reduce(
                (total: number, item: { quantity: number; price: number }) =>
                    total + item.quantity * item.price,
                0
            ),
            assignedTo: data.assignedTo,
        };

        try {
            const response = await putData(formData);
            console.log("Submitted Data:", response);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl mb-4">Order Form</h1>

                <div className="mb-4">
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input id="orderNumber" placeholder="Enter order number" {...register("orderNumber")} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input id="customerName" placeholder="Enter customer name" {...register("customer.name")} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="customerPhone">Customer Phone</Label>
                    <Input id="customerPhone" placeholder="Enter customer phone" {...register("customer.phone")} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="customerAddress">Customer Address</Label>
                    <Textarea id="customerAddress" placeholder="Enter customer address" {...register("customer.address")} />
                </div>

                <div className="mb-4">
                    <Label htmlFor="area">Area</Label>
                    <select id="area" className="w-full p-2 border rounded" {...register("area")}>
                        <option value="">Select Area</option>
                        <option value="Downtown">Downtown</option>
                        <option value="Suburbs">Suburbs</option>
                        <option value="Uptown">Uptown</option>
                    </select>
                </div>

                <h2 className="text-xl mb-2">Items</h2>
                <div className="mb-4">
                    <Label htmlFor="item1Name">Item 1 Name</Label>
                    <Input id="item1Name" placeholder="Enter item name" {...register("items.0.name")} />
                    <Label htmlFor="item1Quantity">Item 1 Quantity</Label>
                    <Input id="item1Quantity" type="number" placeholder="Enter item quantity" {...register("items.0.quantity")} />
                    <Label htmlFor="item1Price">Item 1 Price</Label>
                    <Input id="item1Price" type="number" placeholder="Enter item price" {...register("items.0.price")} />
                </div>

                <div className="mb-4">
                    <Label htmlFor="scheduledFor">Scheduled For</Label>
                    <Input id="scheduledFor" type="datetime-local" {...register("scheduledFor")} />
                </div>

                <div className="mb-4">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <select id="assignedTo" className="w-full p-2 border rounded" {...register("assignedTo")}>
                        <option value="">Select Partner</option>
                        {partners.map((partner) => (
                            <option key={partner._id} value={partner._id}>
                                {partner.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default Page;
