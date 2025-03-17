"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

type TaskTitleProps = {
  title: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onChange: (title: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function TaskTitle({
  title,
  isEditing,
  setIsEditing,
  onChange,
  onSave,
  onCancel,
}: TaskTitleProps) {
  return (
    <div className="mb-6">
      {isEditing ? (
        <div className="flex items-center gap-2 mt-2">
          <Input
            value={title}
            onChange={(e) => onChange(e.target.value)}
            className="text-xl font-bold"
            autoFocus
          />
          <Button size="sm" variant="ghost" onClick={onSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <h2
          className="text-xl font-bold mt-2 cursor-pointer"
          onDoubleClick={() => setIsEditing(true)}
        >
            {title}
        </h2>
      )}
    </div>
  );
}