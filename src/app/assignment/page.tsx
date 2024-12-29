'use client'
import React, { useState } from 'react';
import { Users, TrendingUp, AlertCircle, Clock } from 'lucide-react';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Types from the specification
type Assignment = {
    orderId: string;
    partnerId: string;
    timestamp: string;
    status: 'success' | 'failed';
    reason?: string;
};

type AssignmentMetrics = {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
        reason: string;
        count: number;
    }[];
};

// Demo data
const demoAssignments: Assignment[] = [
    {
        orderId: "ORD001",
        partnerId: "P1",
        timestamp: "2023-01-15T10:30:00Z",
        status: "success",
    },
    {
        orderId: "ORD002",
        partnerId: "P2",
        timestamp: "2023-02-20T14:45:00Z",
        status: "failed",
        reason: "Partner unavailable",
    },
    {
        orderId: "ORD003",
        partnerId: "P3",
        timestamp: "2023-03-10T09:15:00Z",
        status: "success",
    },
    {
        orderId: "ORD004",
        partnerId: "P4",
        timestamp: "2023-04-05T16:00:00Z",
        status: "failed",
        reason: "Area not covered",
    },
];



const demoMetrics: AssignmentMetrics = {
    totalAssigned: 150,
    successRate: 85.5,
    averageTime: 45,
    failureReasons: [
        { reason: 'Partner unavailable', count: 10 },
        { reason: 'Area not covered', count: 5 },
        { reason: 'High load', count: 3 },
        { reason: 'Technical error', count: 2 }
    ]
};

const demoPartnerStatus = {
    available: 12,
    busy: 8,
    offline: 4
};

export default function AssignmentDashboard() {
    const [activeAssignments] = useState<Assignment[]>(demoAssignments);
    const [metrics] = useState<AssignmentMetrics>(demoMetrics);
    const [partnerStatus] = useState(demoPartnerStatus);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Assignment Dashboard</h1>
                <p className="text-gray-500">Monitor real-time assignments and metrics</p>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Assignments</p>
                                <p className="text-2xl font-bold">{metrics.totalAssigned}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Success Rate</p>
                                <p className="text-2xl font-bold">{metrics.successRate}%</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <Progress value={metrics.successRate} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Average Time</p>
                                <p className="text-2xl font-bold">{metrics.averageTime}s</p>
                            </div>
                            <Clock className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Active Partners</p>
                                <p className="text-2xl font-bold">{partnerStatus.available + partnerStatus.busy}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Partner Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Partner Availability</CardTitle>
                    <CardDescription>Current status of delivery partners</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <Alert>
                            <AlertTitle className="text-2xl font-bold text-green-600">{partnerStatus.available}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Available</AlertDescription>
                        </Alert>
                        <Alert>
                            <AlertTitle className="text-2xl font-bold text-orange-600">{partnerStatus.busy}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Busy</AlertDescription>
                        </Alert>
                        <Alert>
                            <AlertTitle className="text-2xl font-bold text-gray-600">{partnerStatus.offline}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Offline</AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>

            {/* Failure Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Failure Analysis</CardTitle>
                    <CardDescription>Distribution of assignment failures by reason</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {metrics.failureReasons.map((reason) => (
                            <div key={reason.reason} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>{reason.reason}</span>
                                    <span className="font-medium">{reason.count}</span>
                                </div>
                                <Progress value={(reason.count / 20) * 100} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Assignments */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Assignments</CardTitle>
                    <CardDescription>Latest assignment attempts and their status</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Partner ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeAssignments.map((assignment) => (
                                <TableRow key={assignment.orderId}>
                                    <TableCell className="font-medium">{assignment.orderId}</TableCell>
                                    <TableCell>{assignment.partnerId}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${assignment.status === 'success'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {assignment.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{assignment.timestamp}</TableCell>
                                    <TableCell>{assignment.reason || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
