import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, UserCheck, UserMinus, Activity } from "lucide-react";
import { getpartner } from '@/actions/partner.actions';

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
    const data = await getpartner();

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
        .sort((a, b) => b.orders - a.orders);

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.length}</div>
                        <p className="text-xs text-muted-foreground">
                            Registered delivery partners
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{available}</div>
                        <p className="text-xs text-muted-foreground">
                            Ready for orders
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Busy</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{busy}</div>
                        <p className="text-xs text-muted-foreground">
                            Currently on delivery
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Offline</CardTitle>
                        <UserMinus className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-600">{offline}</div>
                        <p className="text-xs text-muted-foreground">
                            Currently inactive
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Partner Status Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Partner Status Distribution</CardTitle>
                        <CardDescription>
                            Current delivery partner availability metrics
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-sm font-medium">Available</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {Math.round((available / data.length) * 100)}%
                                </span>
                            </div>
                            <Progress value={(available / data.length) * 100} className="h-2 bg-green-100" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    <span className="text-sm font-medium">Busy</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {Math.round((busy / data.length) * 100)}%
                                </span>
                            </div>
                            <Progress value={(busy / data.length) * 100} className="h-2 bg-orange-100" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                                    <span className="text-sm font-medium">Offline</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {Math.round((offline / data.length) * 100)}%
                                </span>
                            </div>
                            <Progress value={(offline / data.length) * 100} className="h-2 bg-gray-100" />
                        </div>
                    </CardContent>
                </Card>

                {/* Top Areas Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Service Areas</CardTitle>
                        <CardDescription>
                            Areas with highest partner coverage
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {topAreas.map((area) => (
                                <div
                                    key={area.name}
                                    className="flex items-center space-x-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{area.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {area.orders} partners
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPartner;