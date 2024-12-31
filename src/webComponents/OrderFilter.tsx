import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getData, updateData } from '@/actions/order.actions';
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

const statusColors = {
    pending: 'text-yellow-500',
    assigned: 'text-blue-500',
    picked: 'text-green-500',
    delivered: 'text-gray-500',
};

const demoAreas = ['Downtown', 'Suburbs', 'Uptown'];

const OrderFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [areaFilter, setAreaFilter] = useState<string>('all');
    const [ordersState, setOrdersState] = useState<Order[]>([]);
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsInitialLoading(true);
            setError(null);
            try {
                const data = await getData();
                if (Array.isArray(data)) {
                    setOrdersState(data);
                } else {
                    console.error('Unexpected data format:', data);
                    setOrdersState([]); // Fallback to empty array
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch orders');
                console.error('Error fetching orders:', err);
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchOrders();
    }, []); // Remove statusFilter dependency to prevent unnecessary refreshes

    const filteredOrders = ordersState.filter(order => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const matchesArea = areaFilter === 'all' || order.area === areaFilter;
        return matchesSearch && matchesStatus && matchesArea;
    });

    const handleChangeStatus = async (orderId: string, newStatus: Order['status']) => {
        setLoading(prev => ({ ...prev, [orderId]: true }));
        setError(null);

        try {
            const orderToUpdate = ordersState.find(order => order._id === orderId);
            if (!orderToUpdate) {
                throw new Error(`Order with ID ${orderId} not found`);
            }
            
            const updatedOrder = await updateData( newStatus,orderId );
            console.log(updatedOrder)
            // Update local state with the new order data
            setOrdersState(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update order status');
            console.error('Error updating order status:', err);
        } finally {
            setLoading(prev => ({ ...prev, [orderId]: false }));
        }
    };

    if (isInitialLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div>
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

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
                        <SelectItem value="all">All Area</SelectItem>
                        {demoAreas.map(area => (
                            <SelectItem key={area} value={area.toLowerCase()}>{area}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No orders found matching your criteria
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOrders.map(order => (
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
                                        <p className="text-sm font-medium text-gray-500">Scheduled For</p>
                                        <p className="text-sm">{order.scheduledFor}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                        <p className="text-sm font-semibold">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Change Status</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {Object.keys(statusColors).map(status => (
                                                <Button
                                                    key={status}
                                                    variant={order.status === status ? "default" : "outline"}
                                                    size="sm"
                                                    disabled={loading[order._id] || order.status === status}
                                                    onClick={() => handleChangeStatus(order._id, status as Order['status'])}
                                                >
                                                    {loading[order._id] && status === order.status ? (
                                                        <span className="flex items-center">
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Updating...
                                                        </span>
                                                    ) : (
                                                        status.charAt(0).toUpperCase() + status.slice(1)
                                                    )}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                       
                       <div>
                        <Link href={`add_assignment/${order._id}/partner/${order.assignedTo}`}>
                        Assignment </Link>
                       </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderFilter;