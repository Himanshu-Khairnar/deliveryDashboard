// src/components/OrderList.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Order = {
    _id: string;
    orderNumber: string;
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    area: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    status: 'pending' | 'assigned' | 'picked' | 'delivered';
    scheduledFor: string;
    assignedTo?: string;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
};



export default function OrderList({ orders, statusColors }: { orders: Order, statusColors: { [key: string]: string } }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
                <Card key={order._id} className="border rounded-lg shadow-sm    ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            #{order.orderNumber}
                        </CardTitle>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                            {order.status}
                        </span>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Customer</p>
                                <p className="text-sm">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Area</p>
                                <p className="text-sm">{order.area}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Items</p>
                                <div className="text-sm">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Scheduled For</p>
                                <p className="text-sm">{order.scheduledFor}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                <p className="text-sm font-semibold">${order.totalAmount.toFixed(2)}</p>
                            </div>
                            {order.assignedTo && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Assigned To</p>
                                    <p className="text-sm">{order.assignedTo}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
