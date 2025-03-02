"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Mail, Building2, Users } from "lucide-react";
import { Customer } from "../types/CustomerTypes";

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerDetailsModal({ customer, isOpen, onClose }: CustomerDetailsModalProps) {
  if (!customer) return null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [
        ...editedCustomer.notes,
        {
          date: new Date().toISOString().split("T")[0],
          content: newNote.trim(),
          author: "User",
        },
      ];
      setEditedCustomer((prev) => ({
        ...prev,
        notes: updatedNotes,
      }));
      setNewNote("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving customer:", editedCustomer);
    setIsEditing(false);
  };

  const notesTabContent = (
    <div className="space-y-4">
      <div className="space-y-4">
        {editedCustomer.notes.map((note, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{note.date}</span>
              <span className="text-blue-600">@{note.author}</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-gray-800">{note.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
        <Button onClick={handleAddNote} className="mt-2 bg-blue-600 hover:bg-blue-700">
          Add Note
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Customer Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4 rounded border p-4">
            <TabsContent value="info">
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <Input name="email" value={editedCustomer.email} onChange={handleInputChange} placeholder="Email" />
                    <Input name="phone" value={editedCustomer.phone} onChange={handleInputChange} placeholder="Phone" />
                    <Input
                      name="company"
                      value={editedCustomer.company || ""}
                      onChange={handleInputChange}
                      placeholder="Company"
                    />
                    <Input name="type" value={editedCustomer.type} onChange={handleInputChange} placeholder="Type" />
                    <Input
                      name="address"
                      value={editedCustomer.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                    />
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save</Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Email:</span> {customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Phone:</span> {customer.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Company:</span> {customer.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Type:</span> {customer.type}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {customer.address}
                    </div>
                    <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="activity">
              <div className="space-y-4">
                {customer.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-2">
                    {event.type === "call" && <Phone className="h-5 w-5 text-blue-500" />}
                    {event.type === "email" && <Mail className="h-5 w-5 text-green-500" />}
                    {event.type === "meeting" && <Users className="h-5 w-5 text-purple-500" />}
                    <div>
                      <div className="font-medium">{event.description}</div>
                      <div className="text-sm text-gray-500">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="notes">
              <ScrollArea className="h-[400px] pr-4">{notesTabContent}</ScrollArea>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}