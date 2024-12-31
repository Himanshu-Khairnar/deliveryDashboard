'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { postassignment } from '@/actions/assignment.actions';
type AssignmentType = {
    orderId: string;
    partnerId: string;
    timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
}
const AddAssignmentPage = () => {
    const { id, assignedTo } = useParams();

    const [formData, setFormData] = useState<AssignmentType>({
        orderId: id as string|| '',
        partnerId: assignedTo as string|| '',
        timestamp: new Date(),
        status: 'success',
        reason: '',
    });

    console.log(id, assignedTo)

useEffect(() => {
  if (id && assignedTo) {
    setFormData((prev) => ({
      ...prev,
      orderId: id.toString(),
      partnerId: assignedTo.toString(),
    }));
  }
}, [id, assignedTo]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatusChange = (value: "success" | "failed") => {
        setFormData((prev) => ({
            ...prev,
            status: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postdata = await postassignment(formData)
        console.log(postdata)
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Add Assignment</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="reason">Reason</Label>
                            <Textarea
                                id="reason"
                                name="reason"
                                value={formData.reason || ''} // Ensure a default value
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="timestamp">Timestamp</Label>
                            <Input
                                id="timestamp"
                                type="datetime-local"
                                name="timestamp"
                                value={formData.timestamp.toISOString().slice(0, 16)}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={handleStatusChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {formData.status === 'failed' && (
                            <div>
                                <Label htmlFor="reason">Reason</Label>
                                <Textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddAssignmentPage;
