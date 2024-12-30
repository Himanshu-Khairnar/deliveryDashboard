'use client'
import React, { useEffect, useState } from 'react';
import { Package, Search, Filter } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import OrderDashboard from '@/webComponents/OrderDashboard';
import { getData } from '@/actions/order.actions';
import OrderFilter from '@/webComponents/OrderFilter';
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

// Demo data
const demoOrders: Order[] = [
    {
        _id: '1',
        orderNumber: 'ORD001',
        customer: {
            name: 'John Doe',
            phone: '+1-555-0123',
            address: '123 Main St, City',
        },
        area: 'Downtown',
        items: [
            { name: 'Pizza', quantity: 2, price: 15.99 },
            { name: 'Soda', quantity: 2, price: 2.99 }
        ],
        status: 'pending',
        scheduledFor: '14:30',
        totalAmount: 37.96,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '2',
        orderNumber: 'ORD002',
        customer: {
            name: 'Jane Smith',
            phone: '+1-555-0124',
            address: '456 Oak Ave, City',
        },
        area: 'Suburbs',
        items: [
            { name: 'Burger', quantity: 1, price: 12.99 },
            { name: 'Fries', quantity: 1, price: 4.99 }
        ],
        status: 'assigned',
        assignedTo: 'Driver A',
        scheduledFor: '15:00',
        totalAmount: 17.98,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '3',
        orderNumber: 'ORD003',
        customer: {
            name: 'Alice Johnson',
            phone: '+1-555-0125',
            address: '789 Pine Rd, City',
        },
        area: 'Downtown',
        items: [
            { name: 'Salad', quantity: 2, price: 9.99 },
            { name: 'Water', quantity: 2, price: 1.99 }
        ],
        status: 'delivered',
        assignedTo: 'Driver B',
        scheduledFor: '13:30',
        totalAmount: 23.96,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '4',
        orderNumber: 'ORD004',
        customer: {
            name: 'Bob Wilson',
            phone: '+1-555-0126',
            address: '321 Elm St, City',
        },
        area: 'Uptown',
        items: [
            { name: 'Pasta', quantity: 1, price: 14.99 },
            { name: 'Garlic Bread', quantity: 1, price: 3.99 }
        ],
        status: 'picked',
        assignedTo: 'Driver C',
        scheduledFor: '16:00',
        totalAmount: 18.98,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];


const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    picked: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [areaFilter, setAreaFilter] = useState<string>('all');

    useEffect(() => {
        const getOrder = async () => {
            const data = await getData()
            setOrders(data)
        }
        getOrder()
    }, [location.reload])
    
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesArea = areaFilter === 'all' || order.area === areaFilter;
        return matchesSearch && matchesStatus && matchesArea;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Orders Management</h1>

                {/* Stats Overview */}
                <OrderDashboard orders={orders} />

                {/* Filters and Search Section */}
              <OrderFilter orders={orders}/>
            </div>
        </div>
    );
}   