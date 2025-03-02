"use client";

import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Deal, Priority } from "../types/DealTypes";
import { priorityColors } from "../data";
import { DollarSign, Calendar, FileText, Phone, Mail, Users } from "lucide-react";
import { InputDate } from "@/components/ui/date-input";

type DealDetailsModalProps = {
  isOpen: boolean;
  deal: Deal;
  onClose: () => void;
  updateDeal: (dealId: string, updatedData: Deal) => void;
};


export default function DealDetailsModal({ isOpen, deal, onClose, updateDeal }: DealDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeal, setEditedDeal] = useState(deal);

  useEffect(() => {
    setEditedDeal(deal);
  }, [deal]);

  const handleSave = useCallback(() => {
    updateDeal(deal.id, editedDeal);
    setIsEditing(false);
  }, [deal.id, editedDeal, updateDeal]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditedDeal((prev) => ({ ...prev, [name]: name === "value" ? Number(value) : value }));
    },
    []
  );

  const handlePriorityChange = useCallback((value: Priority) => {
    setEditedDeal((prev) => ({ ...prev, priority: value }));
  }, []);

  const handleDateChange = useCallback((date: Date | undefined) => {
    setEditedDeal((prev) => ({
      ...prev,
      expectedClose: date ? date.toISOString().split("T")[0] : prev.expectedClose,
    }));
  }, []);

  const handleAddNote = useCallback(
    (note: string) => {
      const updatedNotes = [
        ...editedDeal.notes,
        { date: new Date().toISOString().split("T")[0], content: note, author: "User" },
      ];
      updateDeal(deal.id, { ...editedDeal, notes: updatedNotes });
    },
    [deal.id, editedDeal, updateDeal]
  );

  const toggleEdit = useCallback(() => setIsEditing((prev) => !prev), []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Deal Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[350px] rounded-md border p-4">
            <OverviewTab
              deal={deal}
              isEditing={isEditing}
              editedDeal={editedDeal}
              onEditToggle={toggleEdit}
              onSave={handleSave}
              onInputChange={handleInputChange}
              onPriorityChange={handlePriorityChange}
              onDateChange={handleDateChange}
            />
            <ActivityTab deal={deal} />
            <NotesTab editedDeal={editedDeal} onAddNote={handleAddNote} />
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


// NoteInput Component
function NoteInput({ onAddNote }: { onAddNote: (note: string) => void }) {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote("");
    }
  };

  return (
    <div className="mt-4">
      <Textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add new note..."
        className="w-full p-2 border rounded-md"
        rows={3}
      />
      <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700" onClick={handleAddNote}>
        Add Note
      </Button>
    </div>
  );
}

// Overview Component
function OverviewTab({
  deal,
  isEditing,
  editedDeal,
  onEditToggle,
  onSave,
  onInputChange,
  onPriorityChange,
  onDateChange,
}: {
  deal: Deal;
  isEditing: boolean;
  editedDeal: Deal;
  onEditToggle: () => void;
  onSave: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPriorityChange: (value: Priority) => void;
  onDateChange: (date: Date | undefined) => void;
}) {
  return (
    <TabsContent value="overview" className="space-y-4">
      {isEditing ? (
        <div className="space-y-4">
          <Input name="name" value={editedDeal.name} onChange={onInputChange} placeholder="Deal Name" />
          <Input name="customer" value={editedDeal.customer} onChange={onInputChange} placeholder="Customer" />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="value"
              type="number"
              value={editedDeal.value}
              onChange={onInputChange}
              placeholder="Value"
            />
            <Select value={editedDeal.priority} onValueChange={onPriorityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <InputDate date={new Date(editedDeal.expectedClose)} onDateChange={onDateChange} />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={onEditToggle}>
              Cancel
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold">{deal.name}</h4>
            <p className="text-sm text-gray-600">{deal.customer}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Value:</span> ${deal.value.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Priority:</span>
              <Badge className={priorityColors[deal.priority]}>{deal.priority}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Expected Close:</span> {deal.expectedClose}
            </div>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={onEditToggle}>
            Edit Deal
          </Button>
        </div>
      )}
    </TabsContent>
  );
}

// Activity Component
function ActivityTab({ deal }: { deal: Deal }) {
  return (
    <TabsContent value="activity" className="space-y-4">
      <div className="space-y-4">
        {deal.activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 border-b pb-2">
            {activity.type === "call" && <Phone className="h-5 w-5 text-blue-500" />}
            {activity.type === "email" && <Mail className="h-5 w-5 text-green-500" />}
            {activity.type === "meeting" && <Users className="h-5 w-5 text-purple-500" />}
            <div>
              <div className="font-medium">{activity.description}</div>
              <div className="text-sm text-gray-500">{activity.date}</div>
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}

// Notes Component
function NotesTab({ editedDeal, onAddNote }: { editedDeal: Deal; onAddNote: (note: string) => void }) {
  return (
    <TabsContent value="notes">
        <div className="space-y-4">
          <div className="space-y-4">
            {editedDeal.notes.map((note, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-3">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{note.date}</span>
                  <span className="text-blue-600">@{note.author}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-gray-800">{note.content}</p>
              </div>
            ))}
           </div>
          <NoteInput onAddNote={onAddNote} />
        </div>
    </TabsContent>
  );
}
