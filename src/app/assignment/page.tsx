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
import AssignmentMetric from '@/webComponents/AssignmentMetric';
import { getassignment } from '@/actions/assignment.actions';
import AssignmentPartnerStatus from '@/webComponents/AssignmentPartnerStatus';
import AssignmentTable from '@/webComponents/AssignmentTable';



export default  function  AssignmentDashboard() {




    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Assignment Dashboard</h1>
                <p className="text-gray-500">Monitor real-time assignments and metrics</p>
            </div>

            {/* Metrics Overview */}
             <AssignmentMetric/>

            {/* Partner Status */}
            <AssignmentPartnerStatus/>

           
            {/* Recent Assignments */}
            <AssignmentTable/>
        </div>
    );
}
