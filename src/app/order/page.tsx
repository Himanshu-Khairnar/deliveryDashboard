'use client'
import React, { useState } from 'react';
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

const demoAreas = ['All Areas', 'Downtown', 'Suburbs', 'Uptown'];

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    picked: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
};

export default function OrdersPage() {
    const [orders] = useState<Order[]>(demoOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [areaFilter, setAreaFilter] = useState<string>('all');

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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-bold">{orders.length}</div>
                            <div className="text-sm text-gray-500">Total Orders</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-bold">
                                {orders.filter(o => o.status === 'pending').length}
                            </div>
                            <div className="text-sm text-gray-500">Pending Orders</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-bold">
                                {orders.filter(o => o.status === 'delivered').length}
                            </div>
                            <div className="text-sm text-gray-500">Delivered Orders</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-bold">
                                ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">Total Revenue</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="picked">Picked</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by area" />
                        </SelectTrigger>
                        <SelectContent>
                            {demoAreas.map(area => (
                                <SelectItem key={area} value={area.toLowerCase()}>{area}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOrders.map((order) => (
                        <Card key={order._id} className="border rounded-lg shadow-sm">
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
            </div>
        </div>
    );
}