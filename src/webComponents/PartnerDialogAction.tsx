import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { format } from "path";
import React, { useEffect, useState } from "react";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
    actionType: "edit" | "delete";
    editData?: {
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
    };
}

const DialogComponent: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    onSubmit,
    actionType,
    editData,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active" as "active" | "inactive",
        currentLoad: 0,
        areas: [] as string[],
        shift: {
            start: "",
            end: ""
        }
    });
       useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || "",
                email: editData.email || "",
                phone: editData.phone || "",
                status: editData.status || "active",
                currentLoad: editData.currentLoad || 0,
                areas: editData.areas || [],
                shift: {
                    start: editData.shift?.start || "",
                    end: editData.shift?.end || ""
                }
            });
        }
    }, [editData]); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "areas") {
            setFormData({ ...formData, areas: value.split(",").map((area) => area.trim()) });
        } else if (name.startsWith("shift.")) {
            const [, key] = name.split(".");
            setFormData({
                ...formData,
                shift: { ...formData.shift, [key]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleStatusChange = (value: string) => {
        if (value === "active" || value === "inactive") {
            setFormData({ ...formData, status: value });
        } else {
            console.error(`Invalid status value: ${value}`);
        }
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(formData); // Call the submit function passed as a prop
        onClose();
         // Optionally close the dialog after submission
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>
                    {actionType === "edit" ? "Edit Partner" : "Confirm Delete"}
                </DialogTitle>
                <div>
                    {actionType === "edit" ? (
                        <form onSubmit={submitForm}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <Input
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <Input
                                        name="email"
                                        placeholder="Email"
                                        value={formData?.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <Input
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData?.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <Select value={formData?.status} onValueChange={handleStatusChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Areas ('Downtown', 'Suburbs', 'Uptown')</label>
                                    <Input
                                        name="areas"
                                        placeholder="Areas (comma-separated)"
                                        value={formData.areas && formData.areas.join(", ")}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Shift Start</label>
                                        <Input
                                            type="time"
                                            name="shift.start"
                                            value={formData?.shift.start}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Shift End</label>
                                        <Input
                                            type="time"
                                            name="shift.end"
                                            value={formData?.shift.end}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <Button type="submit">
                                    {actionType === "edit" ? "Update Partner" : "Delete Partner"}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p>Are you sure you want to delete this partner?</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => onSubmit(editData)}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;
