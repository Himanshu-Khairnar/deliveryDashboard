import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormData {
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

interface DialogComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "inactive",
    currentLoad: 0,
    areas: [] as string[],
    shift: { start: "", end: "" },
  });

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

  const handleSubmit = async () => {
    try {
      await onSubmit(formData as FormData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "inactive",
        currentLoad: 0,
        areas: [],
        shift: { start: "", end: "" },
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Add New Partner</DialogTitle>
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
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Areas (comma-separated)</label>
            <Input
              name="areas"
              placeholder="Areas (comma-separated)"
              value={formData.areas.join(", ")}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Start</label>
              <Input
                type="time"
                name="shift.start"
                placeholder="Shift Start (HH:mm)"
                value={formData.shift.start}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift End</label>
              <Input
                type="time"
                name="shift.end"
                placeholder="Shift End (HH:mm)"
                value={formData.shift.end}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
