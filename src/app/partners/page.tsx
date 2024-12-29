'use client';

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"; 
import { Badge } from '@/components/ui/badge'

export type DeliveryPartner = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
    currentLoad: number; // max: 3
    areas: string[];
    shift: { start: string; end: string };
};

const dummyPartners: DeliveryPartner[] = [
    {
        _id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        status: "active",
        currentLoad: 2,
        areas: ["Area1", "Area2"],
        shift: { start: "08:00", end: "16:00" },
    },
    {
        _id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        status: "inactive",
        currentLoad: 1,
        areas: ["Area3"],
        shift: { start: "10:00", end: "18:00" },
    },
];

// Define table columns
export const columns: ColumnDef<DeliveryPartner>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.getValue("status") === "active" ? "secondary" : "default"}>
                {row.getValue("status")}
            </Badge>
        ),
    },
    {
        accessorKey: "areas",
        header: "Areas",
        cell: ({ row }) => {
            const areas = row.getValue("areas");
            if (Array.isArray(areas)) {
                return areas.join(", ");
            } else {
                return "";
            }
        },
    },
    {
        accessorKey: "shift",
        header: "Shift",
        cell: ({ row }) => {
            const shift = row.getValue("shift") as { start: string; end: string };
            return `${shift.start} - ${shift.end}`;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        •••
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Partner</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export default function PartnersPage() {
    const [partners, setPartners] = React.useState(dummyPartners);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        status: "active",
        areas: "",
        shiftStart: "",
        shiftEnd: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        const newPartner: DeliveryPartner = {
            _id: Math.random().toString(36).substring(2, 9),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            status: formData.status as "active" | "inactive",
            currentLoad: 0,
            areas: formData.areas.split(",").map((area) => area.trim()),
            shift: { start: formData.shiftStart, end: formData.shiftEnd },
        };
        setPartners([...partners, newPartner]);
        setIsDialogOpen(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            status: "active",
            areas: "",
            shiftStart: "",
            shiftEnd: "",
        });
    };

    const table = useReactTable({
        data: partners,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full p-6 space-y-6">
            <h1 className="text-2xl font-bold">Partner Management</h1>
            <Button onClick={() => setIsDialogOpen(true)}>Add Partner</Button>
            <div className="rounded-md border mt-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>Add New Partner</DialogTitle>
                    <div className="space-y-4">
                        <Input
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <Input
                            name="areas"
                            placeholder="Areas (comma-separated)"
                            value={formData.areas}
                            onChange={handleInputChange}
                        />
                        <div className="flex gap-2">
                            <Input
                                name="shiftStart"
                                placeholder="Shift Start (HH:mm)"
                                value={formData.shiftStart}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="shiftEnd"
                                placeholder="Shift End (HH:mm)"
                                value={formData.shiftEnd}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button onClick={handleFormSubmit}>Submit</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
