import React from 'react';
import {
  Package,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { getpartner } from '@/actions/partner.actions';

// Demo data
const metrics = {
  totalOrders: 156,
  activePartners: 24,
  avgDeliveryTime: 28,
  completionRate: 94.5,
};

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    area: "Downtown",
    status: "delivered",
    partner: "Mike Smith",
    time: "10 mins ago"
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    area: "Uptown",
    status: "pending",
    partner: "-",
    time: "15 mins ago"
  },
  {
    id: "ORD003",
    customer: "Robert Johnson",
    area: "Midtown",
    status: "assigned",
    partner: "Sarah Wilson",
    time: "20 mins ago"
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    area: "Suburbs",
    status: "picked",
    partner: "Tom Davis",
    time: "25 mins ago"
  }
];

const partnerStatus = {
  available: 12,
  busy: 8,
  offline: 4,
  topAreas: [
    { name: "Downtown", orders: 45 },
    { name: "Uptown", orders: 32 },
    { name: "Midtown", orders: 28 },
    { name: "Suburbs", orders: 21 }
  ]
};

export default function Dashboard() {

  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Delivery Dashboard</h1>
          <p className="text-gray-500">Real-time delivery management overview</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{metrics.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Partners</p>
                <p className="text-2xl font-bold">{metrics.activePartners}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Delivery Time</p>
                <p className="text-2xl font-bold">{metrics.avgDeliveryTime} min</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">{metrics.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <Progress value={metrics.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Partner Status */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Partner Status</CardTitle>
            <CardDescription>Current delivery partner availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Available</span>
                <span className="text-sm font-bold text-green-600">{partnerStatus.available}</span>
              </div>
              <Progress value={(partnerStatus.available / 24) * 100} className="bg-green-100" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Busy</span>
                <span className="text-sm font-bold text-orange-600">{partnerStatus.busy}</span>
              </div>
              <Progress value={(partnerStatus.busy / 24) * 100} className="bg-orange-100" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Offline</span>
                <span className="text-sm font-bold text-gray-600">{partnerStatus.offline}</span>
              </div>
              <Progress value={(partnerStatus.offline / 24) * 100} className="bg-gray-100" />
            </div>
          </CardContent>
        </Card>

        {/* Top Areas */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Areas</CardTitle>
            <CardDescription>Areas with highest order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {partnerStatus.topAreas.map((area) => (
                <div key={area.name} className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{area.name}</p>
                    <p className="text-sm text-gray-500">{area.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
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
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
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
                  <TableCell>{order.partner}</TableCell>
                  <TableCell>{order.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}