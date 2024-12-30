'use client'
import { getpartner } from '@/actions/partner.actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useDebugValue, useEffect, useState } from 'react'


type DeliveryPartner = {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    currentLoad: number;
    areas: string[];
    shift: {
        start: string; end: string;
    };
}

const AssignmentPartnerStatus = () => {
    const PartnerStatus = {
        available: 0,
        busy: 0,
        offline: 0
    };
    const [partners, setpartners] = useState<DeliveryPartner[]>([])
    useEffect(() => {
        const getdata = async () => {
            const data = await getpartner()
            setpartners(data)
        }
        getdata()
    }, [location.reload])
    partners.forEach((partner: { status: string; currentLoad: number }) => {
        if (partner.status === "active") {
            if (partner.currentLoad === 0) {
                PartnerStatus.available++;
            } else {
                PartnerStatus.busy++;
            }
        } else if (partner.status === "inactive") {
            PartnerStatus.offline++;
        }
    });
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Partner Availability</CardTitle>
                    <CardDescription>Current status of delivery partners</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <Alert>
                            <AlertTitle className="text-2xl font-bold text-green-600">{PartnerStatus.available}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Available</AlertDescription>
                        </Alert>
                        <Alert>
                            <AlertTitle className="text-2xl font-bold text-orange-600">{PartnerStatus.busy}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Busy</AlertDescription>
                        </Alert>
                        <Alert>
                            <AlertTitle className="text-2xl font-bold text-gray-600">{PartnerStatus.offline}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Offline</AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AssignmentPartnerStatus
