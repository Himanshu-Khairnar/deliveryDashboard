import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
type Order = {
    _id: string; orderNumber: string; customer: {
        name: string;
        phone: string;
        address: string;
    };
    area: string; items: {
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
const OrderDashboard = ({ orders }:{orders:Order[]}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
                <CardContent className="pt-4">
                    <div className="text-2xl font-bold">{orders?.length}</div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                        {orders?.filter(o => o.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-500">Pending Orders</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                        {orders?.filter(o => o.status === 'delivered').length}
                    </div>
                    <div className="text-sm text-gray-500">Delivered Orders</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-4">
                    <div className="text-2xl font-bold">
                        ${orders?.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderDashboard
