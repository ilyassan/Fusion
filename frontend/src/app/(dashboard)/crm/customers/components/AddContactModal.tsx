"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "../types/CustomerTypes";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (newContact: Omit<Customer, "id" | "timeline" | "notes" | "deals" | "value" | "status" | "lastContact">) => void;
}

export function AddContactModal({ isOpen, onClose, onAddContact }: AddContactModalProps) {
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    type: "Individual" as const,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddContact(newContact);
    setNewContact({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      type: "Individual",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={newContact.name} onChange={handleInputChange} placeholder="Name" required />
          <Input
            name="email"
            type="email"
            value={newContact.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <Input name="phone" value={newContact.phone} onChange={handleInputChange} placeholder="Phone" />
          <Input name="company" value={newContact.company} onChange={handleInputChange} placeholder="Company" />
          {/* Add Address Input */}
          <Input
            name="address"
            value={newContact.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
          <Select
            name="type"
            value={newContact.type}
            onValueChange={(value) => handleInputChange({ target: { name: "type", value } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Add Contact
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}