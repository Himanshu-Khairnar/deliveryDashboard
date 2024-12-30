import { getassignment } from '@/actions/assignment.actions'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, Clock, TrendingUp, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type Assignment = {
    orderId: string;
    partnerId: string;
    timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
}
const AssignmentMetric =  () => {

    const [data,setdata] = useState<Assignment[]>([])
    useEffect(()=>{
        const getdata = async()=>{
            const res = await getassignment()
            setdata(res)
        }
        getdata()
    },[location.reload])
    const totalAssigned = data.length;
    const successfulAssignments = data.filter(
        (assignment: Assignment) => assignment.status === 'success'
    ).length;

    const calculateAverageTime = () => {
        if (totalAssigned === 0) return 0;

        const totalTime = data.reduce((sum, assignment) => {
            const assignmentTime = new Date(assignment.timestamp).getTime();
            const now = new Date().getTime();
            return sum + (now - assignmentTime);
        }, 0);

        return totalTime / totalAssigned;
    };

    const activePartners = new Set(
        data.map((assignment: Assignment) => assignment.partnerId)
    ).size;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Assignments</p>
                                <p className="text-2xl font-bold">{totalAssigned}</p>
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
                                <p className="text-2xl font-bold">{((successfulAssignments / totalAssigned) * 100).toFixed(2)}%</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-green-500" />
                        </div>
                        {/* <Progress value={metrics.successRate} className="mt-2" /> */}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Average Time</p>
                                <p className="text-2xl font-bold">{calculateAverageTime()}s</p>
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
                                <p className="text-2xl font-bold">{activePartners}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AssignmentMetric
