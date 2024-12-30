// tableColumns.ts
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

interface Partner {
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
    currentLoad: number;
    areas: string[];
    shift: {
        start: string;
        end: string;
    };
}

export const columns = (
    onEdit: (data: Partner) => void,
    onDelete: (data: Partner) => void
): ColumnDef<Partner>[] => [
    
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => row.original.name,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.original.email,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.original.phone,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "currentLoad",
        header: "Current Load",
        cell: ({ row }) => `${row.original.currentLoad} work`,
    },
    {
        accessorKey: "areas",
        header: "Areas",
        cell: ({ row }) => row.original.areas.join(", "),
    },
    {
        accessorKey: "shift",
        header: "Shift",
        cell: ({ row }) => `${row.original.shift.start} - ${row.original.shift.end}`,
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(row.original)}
                >
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(row.original)}
                >
                    Delete
                </Button>
            </div>
        ),
    },
];
