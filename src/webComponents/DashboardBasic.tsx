import { getAssignmentMetric } from "@/actions/assignment.actions";
import { getpartner } from "@/actions/partner.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssignmentMetrics } from "@/Models/AssignmentMetric.model";
import { Clock, Package, TrendingUp, Users } from "lucide-react";
type AssignmentMetrics = {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons: {
        reason:
        string; count: number;
    }
}
export default async function DashboardBasic() {

    const partners = await getpartner()
    const metrics = await getAssignmentMetric() 


    return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold">{metrics.totalAssigned}</p>
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
                        <p className="text-2xl font-bold">{partners.length}</p>
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
                        <p className="text-2xl font-bold">{metrics.averageTime} min</p>
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
                        <p className="text-2xl font-bold">{metrics.successRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
                <Progress value={metrics.successRate} className="mt-2" />
            </CardContent>
        </Card>
    </div>)
}