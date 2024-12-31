'use client';
import { getpartner } from '@/actions/partner.actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

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
};

const AssignmentPartnerStatus = () => {
    const [partners, setpartners] = useState<DeliveryPartner[]>([]);
    const [partnerStatus, setPartnerStatus] = useState({
        available: 0,
        busy: 0,
        offline: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getpartner();
                setpartners(data);
                updatePartnerStatus(data);
            } catch (error) {
                setError('Failed to fetch partner data.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const updatePartnerStatus = (partners: DeliveryPartner[]) => {
        const status = {
            available: 0,
            busy: 0,
            offline: 0,
        };

        partners.forEach((partner) => {
            if (partner.status === 'active') {
                if (partner.currentLoad === 0) {
                    status.available++;
                } else {
                    status.busy++;
                }
            } else if (partner.status === 'inactive') {
                status.offline++;
            }
        });
        setPartnerStatus(status);
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Partner Availability</CardTitle>
                    <CardDescription>Current status of delivery partners</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Alert className="bg-green-100 border border-green-500">
                            <AlertTitle className="text-2xl font-bold text-green-600">{partnerStatus.available}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Available</AlertDescription>
                        </Alert>
                        <Alert className="bg-orange-100 border border-orange-500">
                            <AlertTitle className="text-2xl font-bold text-orange-600">{partnerStatus.busy}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Busy</AlertDescription>
                        </Alert>
                        <Alert className="bg-gray-100 border border-gray-500">
                            <AlertTitle className="text-2xl font-bold text-gray-600">{partnerStatus.offline}</AlertTitle>
                            <AlertDescription className="text-sm text-gray-600">Offline</AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AssignmentPartnerStatus;
