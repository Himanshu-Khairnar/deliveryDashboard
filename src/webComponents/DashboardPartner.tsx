import { getpartner } from '@/actions/partner.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MapPin } from 'lucide-react'
import React from 'react'
type DeliveryPartner = {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    currentLoad: number;
    areas: string[];
    shift: {
        start: string;
        end: string;
    };
}
const DashboardPartner = async () => {

    const data = await getpartner()
    const available = data.filter(
        (partner: DeliveryPartner) => partner.status === "active" && partner.currentLoad === 0
    ).length;

    const busy = data.filter(
        (partner: DeliveryPartner) => partner.status === "active" && partner.currentLoad > 0
    ).length;

    const offline = data.filter(
        (partner: DeliveryPartner) => partner.status === "inactive"
    ).length;

    // Calculate top areas
    const areaCounts: { [key: string]: number } = {};
    data.forEach((partner: DeliveryPartner) => {
        partner.areas.forEach((area) => {
            areaCounts[area] = (areaCounts[area] || 0) + 1;
        });
    });

    const topAreas = Object.entries(areaCounts)
        .map(([name, orders]) => ({ name, orders }))
        .sort((a, b) => b.orders - a.orders); // Sort by order count descending

    return (
        <div>
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
                                <span className="text-sm font-bold text-green-600">{available}</span>
                            </div>
                            <Progress value={(available / 24) * 100} className="bg-green-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-sm">Busy</span>
                                <span className="text-sm font-bold text-orange-600">{busy}</span>
                            </div>
                            <Progress value={(busy / 24) * 100} className="bg-orange-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-sm">Offline</span>
                                <span className="text-sm font-bold text-gray-600">{offline}</span>
                            </div>
                            <Progress value={(offline / 24) * 100} className="bg-gray-100" />
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
                            {topAreas.map((area) => (
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
        </div>
    )
}

export default DashboardPartner
