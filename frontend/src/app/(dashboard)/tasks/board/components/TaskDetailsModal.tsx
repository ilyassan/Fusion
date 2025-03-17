"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Task } from "../types/KanbanTypes";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import TaskTitle from "./Task/TaskTitle";
import TaskDescription from "./Task/TaskDescription";
import TaskStatus from "./Task/TaskStatus";
import TaskTabs from "./Task/TaskTabs";
import TaskDetails from "./Task/TaskDetails";
import { format } from "date-fns";

type TaskDetailsModalProps = {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
  updateTask: (taskId: string, updatedData: Partial<Task>) => void;
  availableAssignees?: string[];
  availableLabels?: string[];
};

export default function TaskDetailsModal({
  isOpen,
  task,
  onClose,
  updateTask,
  availableAssignees = ["user1", "user2", "user3"],
  availableLabels = ["bug", "feature", "enhancement"],
}: TaskDetailsModalProps) {
  const [formState, setFormState] = useState({
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    startDate: task.startDate,
    dueDate: task.dueDate,
    tags: task.tags,
    status: task.status,
    priority: task.priority,
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [debouncedFormState] = useDebounce(formState, 500);

  useEffect(() => {
    const changes: Partial<Task> = {};
    if (debouncedFormState.title !== task.title) changes.title = debouncedFormState.title;
    if (debouncedFormState.description !== task.description)
      changes.description = debouncedFormState.description;
    if (debouncedFormState.assignee !== task.assignee)
      changes.assignee = debouncedFormState.assignee;
    if (debouncedFormState.startDate !== task.startDate)
      changes.startDate = debouncedFormState.startDate;
    if (debouncedFormState.dueDate !== task.dueDate)
      changes.dueDate = debouncedFormState.dueDate;
    if (JSON.stringify(debouncedFormState.tags) !== JSON.stringify(task.tags))
      changes.tags = debouncedFormState.tags;
    if (debouncedFormState.status !== task.status) changes.status = debouncedFormState.status;
    if (debouncedFormState.priority !== task.priority)
      changes.priority = debouncedFormState.priority;

    if (Object.keys(changes).length > 0) {
      updateTask(task.id, changes);
    }
  }, [debouncedFormState, task, updateTask]);

  const handleTitleSave = () => setIsEditingTitle(false);
  const handleTitleCancel = () => {
    setFormState((prev) => ({ ...prev, title: task.title }));
    setIsEditingTitle(false);
  };
  const handleDescriptionSave = () => setIsEditingDescription(false);
  const handleDescriptionCancel = () => {
    setFormState((prev) => ({ ...prev, description: task.description }));
    setIsEditingDescription(false);
  };

  const createdDate = task.activityLog?.length
    ? format(new Date(task.activityLog[0].timestamp), "MMM dd, yyyy")
    : "Unknown";
  const updatedDate = task.activityLog?.length
    ? format(new Date(task.activityLog[task.activityLog.length - 1].timestamp), "MMM dd, yyyy")
    : "Unknown";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] w-full p-0 h-[80vh] overflow-hidden flex gap-0">
        <div className="w-3/5 p-6 border-r overflow-y-auto">
          <DialogTitle className="sr-only">Task Details</DialogTitle>
          <TaskTitle
            title={formState.title}
            isEditing={isEditingTitle}
            setIsEditing={setIsEditingTitle}
            onChange={(title) => setFormState((prev) => ({ ...prev, title }))}
            onSave={handleTitleSave}
            onCancel={handleTitleCancel}
          />
          <TaskDescription
            description={formState.description}
            isEditing={isEditingDescription}
            setIsEditing={setIsEditingDescription}
            onChange={(description) => setFormState((prev) => ({ ...prev, description }))}
            onSave={handleDescriptionSave}
            onCancel={handleDescriptionCancel}
          />
          <TaskStatus
            status={formState.status}
            onChange={(status) => setFormState((prev) => ({ ...prev, status }))}
          />
          <TaskTabs task={task} updateTask={updateTask} />
        </div>
        <TaskDetails
          formState={formState}
          setFormState={(updates) => setFormState((prev) => ({ ...prev, ...updates }))}
          availableAssignees={availableAssignees}
          availableLabels={availableLabels}
          createdDate={createdDate}
          updatedDate={updatedDate}
        />
      </DialogContent>
    </Dialog>
  );
}