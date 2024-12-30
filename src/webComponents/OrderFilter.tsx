import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
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

const statusColors = {
    pending: 'text-yellow-500',
    assigned: 'text-blue-500',
    picked: 'text-green-500',
    delivered: 'text-gray-500',
};
const demoAreas = ['Downtown', 'Suburbs', 'Uptown'];

const OrderFilter = ({ orders }: { orders: Order[] }) => {
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
        <div>
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
                        <SelectItem value='all'>All Area</SelectItem>
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
    )
}

export default OrderFilter
