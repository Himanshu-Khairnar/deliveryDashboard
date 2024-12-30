import { getData } from '@/actions/order.actions'
import { getpartner, getSpecficpartner } from '@/actions/partner.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle } from 'lucide-react'
import React from 'react'

type DeliveryPartner = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    currentLoad: number;
    areas: string[];
    shift: {
        start: string;
        end: string;
    }
}

type Order = {
    _id: string;
    orderNumber: string;
    customer: {
        name:
        string; phone: string;
        address: string;
    };
    area: string;
    items:
    {
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
const Dashboardtable = async () => {
    const recentOrders = await getData()
    const partners = await getpartner()
    const partnerMap = partners.reduce((map: Record<string, string>, partner: DeliveryPartner) => {
        map[partner._id] = partner.name;
        return map;
    }, {} as Record<string, string>);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest delivery updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Partner</TableHead>
                                <TableHead>Items Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order: Order) => (
                                <TableRow key={order._id}>
                                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                    <TableCell>{order.customer.name}</TableCell>
                                    <TableCell>{order.area}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${order.status === 'delivered'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : order.status === 'assigned'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                            {order.status === 'delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{partnerMap[order.assignedTo!] || 'Unassigned'}</TableCell>
                                    <TableCell>{order.items[0].name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboardtable
