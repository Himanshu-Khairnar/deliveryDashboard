import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AddOrderDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (orderData: any) => void;
};

export default function AddOrderDialog({ isOpen, onClose, onSubmit }: AddOrderDialogProps) {
    const [orderData, setOrderData] = useState({
        orderNumber: '',
        customerName: '',
        customerPhone: '',
        customerAddress: '',
        area: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        scheduledFor: '',
        totalAmount: 0,
        assignedTo: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const { name, value } = e.target;

        if (name.startsWith('item')) {
            const itemIndex = parseInt(name.split('-')[1]);
            const newItems = [...orderData.items];
            newItems[itemIndex] = { ...newItems[itemIndex], [name.split('-')[0]]: value };
            setOrderData({ ...orderData, items: newItems });
        } else {
            setOrderData({ ...orderData, [name]: value });
        }
    };

    const handleAddItem = () => {
        setOrderData({
            ...orderData,
            items: [...orderData.items, { name: '', quantity: 1, price: 0 }],
        });
    };

    const handleRemoveItem = (index: number) => {
        const newItems = orderData.items.filter((_, i) => i !== index);
        setOrderData({ ...orderData, items: newItems });
    };

    const handleSubmit = () => {
        // Calculate totalAmount
        const totalAmount = orderData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const updatedOrderData = { ...orderData, totalAmount };
        onSubmit(updatedOrderData); // Call onSubmit to send data to parent
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[500px] p-4 max-h-[90vh] overflow-y-auto"> {/* Added scrollable content */}
                <DialogHeader>
                    <DialogTitle className="text-lg">Add New Order</DialogTitle>
                    <DialogDescription>Fill in the order details below.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Order Number */}
                    <div>
                        <Label htmlFor="orderNumber">Order Number</Label>
                        <Input
                            id="orderNumber"
                            name="orderNumber"
                            value={orderData.orderNumber}
                            onChange={handleInputChange}
                            placeholder="Order Number"
                        />
                    </div>

                    {/* Customer Information */}
                    <div>
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input
                            id="customerName"
                            name="customerName"
                            value={orderData.customerName}
                            onChange={handleInputChange}
                            placeholder="Customer Name"
                        />
                    </div>

                    <div>
                        <Label htmlFor="customerPhone">Customer Phone</Label>
                        <Input
                            id="customerPhone"
                            name="customerPhone"
                            value={orderData.customerPhone}
                            onChange={handleInputChange}
                            placeholder="Customer Phone"
                        />
                    </div>

                    <div>
                        <Label htmlFor="customerAddress">Customer Address</Label>
                        <Input
                            id="customerAddress"
                            name="customerAddress"
                            value={orderData.customerAddress}
                            onChange={handleInputChange}
                            placeholder="Customer Address"
                        />
                    </div>

                    {/* Area */}
                    <div>
                        <Label htmlFor="area">Area</Label>
                        <Input
                            id="area"
                            name="area"
                            value={orderData.area}
                            onChange={handleInputChange}
                            placeholder="Area"
                        />
                    </div>

                    {/* Items */}
                    <div>
                        <Label>Items</Label>
                        {orderData.items.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div>
                                    <Input
                                        name={`item-${index}-name`}
                                        value={item.name}
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder="Item Name"
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="number"
                                        name={`item-${index}-quantity`}
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder="Quantity"
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="number"
                                        name={`item-${index}-price`}
                                        value={item.price}
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder="Price"
                                    />
                                </div>
                                <Button variant="secondary" onClick={() => handleRemoveItem(index)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={handleAddItem}>
                            Add Item
                        </Button>
                    </div>

                    {/* Scheduled For */}
                    <div>
                        <Label htmlFor="scheduledFor">Scheduled For</Label>
                        <Input
                            id="scheduledFor"
                            name="scheduledFor"
                            type="datetime-local"
                            value={orderData.scheduledFor}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Assigned To */}
                    <div>
                        <Label htmlFor="assignedTo">Assigned To</Label>
                        <Input
                            id="assignedTo"
                            name="assignedTo"
                            value={orderData.assignedTo}
                            onChange={handleInputChange}
                            placeholder="Assigned To (User ID)"
                        />
                    </div>

                    {/* Total Amount */}
                    <div>
                        <Label>Total Amount</Label>
                        <Input
                            name="totalAmount"
                            value={orderData.totalAmount}
                            readOnly
                            disabled
                        />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <DialogFooter>
                        <Button onClick={handleSubmit}>Save Order</Button>
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
