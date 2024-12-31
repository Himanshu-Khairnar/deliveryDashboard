import { getassignment } from '@/actions/assignment.actions';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Clock, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Assignment = {
    orderId: string;
    partnerId: string;
    timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
};

const AssignmentMetric = () => {
    const [data, setdata] = useState<Assignment[]>([]);

    useEffect(() => {
        const getdata = async () => {
            const res = await getassignment();
            setdata(res);
        };
        getdata();
    }, []);

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

        return (totalTime / totalAssigned / 1000).toFixed(2); // Convert to seconds
    };

    const activePartners = new Set(
        data.map((assignment: Assignment) => assignment.partnerId)
    ).size;

    return (
        <div className="bg-gray-100  p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Assignments</p>
                                <p className="text-4xl font-bold text-gray-800">{totalAssigned}</p>
                            </div>
                            <TrendingUp className="h-10 w-10 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Success Rate</p>
                                <p className="text-4xl font-bold text-gray-800">
                                    {((successfulAssignments / totalAssigned) * 100).toFixed(2)}%
                                </p>
                            </div>
                            <AlertCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <Progress
                            value={((successfulAssignments / totalAssigned) * 100)}
                            className="mt-4 bg-gray-200"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Average Time</p>
                                <p className="text-4xl font-bold text-gray-800">{calculateAverageTime()}s</p>
                            </div>
                            <Clock className="h-10 w-10 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Active Partners</p>
                                <p className="text-4xl font-bold text-gray-800">{activePartners}</p>
                            </div>
                            <Users className="h-10 w-10 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AssignmentMetric;
