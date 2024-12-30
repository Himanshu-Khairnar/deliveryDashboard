'use client';

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';

type OrderDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function OrderDialog({ isOpen, onClose }: OrderDialogProps) {
    if (!isOpen) return null; // Prevent rendering when the dialog is not open

    return (
    
    );
}
