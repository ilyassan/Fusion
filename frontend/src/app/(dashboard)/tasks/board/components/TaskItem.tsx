"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskItemContent from "./TaskItemContent";
import { Task, TaskStatus } from "../types/KanbanTypes";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type TaskItemProps = {
  task: Task;
  status: TaskStatus;
  onDetailsClick: (task: Task) => void;
  isSelected: boolean;
  onSelectChange: (isSelected: boolean) => void;
};

export default function TaskItem({
  task,
  status,
  onDetailsClick,
  isSelected,
  onSelectChange,
}: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow relative cursor-grab"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectChange(!!checked)}
              className="absolute top-1 left-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-blue-500"
            />
            <div {...attributes} {...listeners} className="flex-1">
              <TaskItemContent task={task} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDetailsClick(task);
              }}
              className="absolute top-1 right-1 h-6 w-6 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogTrigger>
    </Dialog>
  );
}