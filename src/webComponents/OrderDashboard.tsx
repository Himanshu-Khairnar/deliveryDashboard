import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

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
}

const OrderDashboard = ({ orders }: { orders: Order[] }) => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <Card className="bg-blue-50 border border-blue-200 ">
                <CardContent className="pt-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{totalOrders}</div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                </CardContent>
            </Card>

            <Card className="bg-yellow-50 border border-yellow-200">
                <CardContent className="pt-4 text-center">
                    <div className="text-3xl font-bold text-yellow-600">{pendingOrders}</div>
                    <div className="text-sm text-gray-500">Pending Orders</div>
                </CardContent>
            </Card>

            <Card className="bg-green-50 border border-green-200">
                <CardContent className="pt-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{deliveredOrders}</div>
                    <div className="text-sm text-gray-500">Delivered Orders</div>
                </CardContent>
            </Card>

            <Card className="bg-purple-50 border border-purple-200">
                <CardContent className="pt-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">${totalRevenue}</div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderDashboard
