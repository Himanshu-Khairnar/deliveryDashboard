'use client'
import React, { useEffect, useState } from 'react';
import OrderDashboard from '@/webComponents/OrderDashboard';
import { getData } from '@/actions/order.actions';
import OrderFilter from '@/webComponents/OrderFilter';
import Link from 'next/link';

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

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const getOrder = async () => {
            const data = await getData()
            setOrders(data)
        }
        getOrder()
    }, [location.reload]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Orders Management</h1>

                {/* Stats Overview */}
                <div className="h-min-screen">
                    <OrderDashboard orders={orders} />
                </div>

                {/* Add Order Button */}
                <Link href={'add_orders'} passHref>
                    <p className="inline-block px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-200">
                        Add Orders
                    </p>
                </Link>

                <div className="mt-10">
                    {/* Filters and Search Section */}
                    <OrderFilter />
                </div>
            </div>
        </div>
    );
}
