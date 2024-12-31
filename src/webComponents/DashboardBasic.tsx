import { getAssignmentMetric } from "@/actions/assignment.actions";
import { getpartner } from "@/actions/partner.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Package, TrendingUp, Users } from "lucide-react";

type AssignmentMetrics = {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
        reason: string;
        count: number;
    };
};

export default async function DashboardBasic() {
    const partners = await getpartner();
    const metrics = await getAssignmentMetric();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-100 min-h-screen">
            {/* Card: Total Orders */}
            <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-800">{metrics.totalAssigned}</p>
                        </div>
                        <Package className="h-10 w-10 text-blue-500" />
                    </div>
                </CardContent>
            </Card>

            {/* Card: Active Partners */}
            <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Active Partners</p>
                            <p className="text-3xl font-bold text-gray-800">{partners.length}</p>
                        </div>
                        <Users className="h-10 w-10 text-green-500" />
                    </div>
                </CardContent>
            </Card>

            {/* Card: Avg Delivery Time */}
            <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Avg Delivery Time</p>
                            <p className="text-3xl font-bold text-gray-800">{metrics.averageTime} min</p>
                        </div>
                        <Clock className="h-10 w-10 text-orange-500" />
                    </div>
                </CardContent>
            </Card>

            {/* Card: Completion Rate */}
            <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Completion Rate</p>
                            <p className="text-3xl font-bold text-gray-800">{metrics.successRate}%</p>
                        </div>
                        <TrendingUp className="h-10 w-10 text-purple-500" />
                    </div>
                    <Progress value={metrics.successRate} className="mt-4 bg-gray-200" />
                </CardContent>
            </Card>
        </div>
    );
}
