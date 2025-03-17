"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from "../types/KanbanTypes";
import { useState } from "react";

type AddTaskModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addTask: (taskData: Partial<Task>) => void;
};

export default function AddTaskModal({ isOpen, setIsOpen, addTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    addTask({ title });
    setTitle("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}