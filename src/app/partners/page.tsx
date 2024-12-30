'use client'
import React, { useState, useEffect } from "react";
import PartnersTable from "@/webComponents/Partnertable";
import DialogComponent from "@/webComponents/PartnerDialog";
import { getpartner, postPartner, updatePartner, deletePartner } from "@/actions/partner.actions"; // Import necessary actions
import { columns } from "@/webComponents/PartnersColumns";
import DialogComponentAction from "@/webComponents/PartnerDialogAction";

interface Partner {
    _id?: string;
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

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isDialogOpenAction, setIsDialogOpenAction] = useState<boolean>(false);
    const [dialogActionType, setDialogActionType] = useState<"edit" | "delete">("edit");
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const partnerData = await getpartner();
                setPartners(partnerData);
            } catch (error) {
                console.error("Failed to fetch partners:", error);
            }
        };

        fetchPartners();
    }, []);

    const handleFormSubmit = async (formData: Partner) => {
        try {
            const newPartner = await postPartner(formData);
            setPartners((prev) => [...prev, newPartner]);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to add partner:", error);
        }
    };

    const handleForm = async (formData: Partner) => {
        try {
            if (dialogActionType === "edit") {
                if (selectedPartner?._id) {
                    console.log('in update')
                    const updatedPartner = await updatePartner(selectedPartner._id, formData); 
                    setPartners(partners.map(p => (p._id === updatedPartner._id ? updatedPartner : p)));
                }
            } else if (dialogActionType === "delete") {
                if (selectedPartner?._id) {
                    await deletePartner(selectedPartner._id); // Call delete action
                    setPartners(partners.filter(p => p._id !== selectedPartner._id));
                }
            }
            setIsDialogOpenAction(false);
        } catch (error) {
            console.error("Failed to perform action:", error);
        }
    };


    const openDialog = (type: "edit" | "delete", partner: Partner) => {
        setDialogActionType(type);
        setSelectedPartner(partner);
        setIsDialogOpenAction(true);
    };

    return (
        <div className="w-full p-6 space-y-6">
            <h1 className="text-2xl font-bold">Partner Management</h1>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setIsDialogOpen(true)}
            >
                Add Partner
            </button>
            <PartnersTable partners={partners} columns={columns(
                (partner) => openDialog("edit", partner),
                (partner) => openDialog("delete", partner)
            )} />
            <DialogComponent
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleFormSubmit}
            />
            <DialogComponentAction
                isOpen={isDialogOpenAction}
                onClose={() => setIsDialogOpenAction(false)}
                onSubmit={handleForm}
                actionType={dialogActionType}
                editData={selectedPartner!}
            />
        </div>
    );
}
