'use client'
import { getassignment } from '@/actions/assignment.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'

type Assignment = {
    orderId: string;
    partnerId: string;
    timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
}

const AssignmentTable = () => {

    const [activeAssignments, setactiveassignment] = useState<Assignment[]>([])
    useEffect(() => {
        const getdata = async () => {
            const data = await getassignment()
            setactiveassignment(data)

        }
        getdata()
    },[location.reload])
    return (
        <div>
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
                                    <TableCell>{assignment.timestamp.toLocaleString()}</TableCell>
                                    <TableCell>{assignment.reason || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default AssignmentTable
