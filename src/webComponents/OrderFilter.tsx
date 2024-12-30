'use client';

import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

type FiltersProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    areaFilter: string;
    setAreaFilter: (area: string) => void;
};

const demoAreas = [ 'Downtown', 'Suburbs', 'Uptown'];

export default function Filters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    areaFilter,
    setAreaFilter
}: FiltersProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; 
    }

    return (
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex items-center ">
                <input
                    type="text"
                    placeholder="Search orders..."
                    aria-label="Search orders"
                    className="pl-4 pr-10 w-full h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="   h-4 w-10 text-gray-400" />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="picked">Picked</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
            </Select>

            {/* Area Filter */}
            <Select value={areaFilter} onValueChange={setAreaFilter} >
                <SelectTrigger className="h-10">
                    <SelectValue placeholder="Filter by area" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All Area</SelectItem>
                    {demoAreas.map(area => (
                        <SelectItem key={area} value={area.toLowerCase()}>{area}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </form>
    );
}
