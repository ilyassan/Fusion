"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

type TaskDescriptionProps = {
  description: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onChange: (description: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function TaskDescription({
  description,
  isEditing,
  setIsEditing,
  onChange,
  onSave,
  onCancel,
}: TaskDescriptionProps) {
  return (
    <div className="mb-6">
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={description}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border rounded-md min-h-[150px]"
            placeholder="Add a description..."
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={onSave}
            >
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="prose max-w-none p-4 border border-dashed rounded-md hover:bg-slate-50 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {description ? (
            <ReactMarkdown>{description}</ReactMarkdown>
          ) : (
            <p className="text-gray-400">Add a description...</p>
          )}
        </div>
      )}
    </div>
  );
}