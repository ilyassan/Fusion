"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Priority, Task } from "../../types/KanbanTypes";

type TaskDetailsProps = {
  formState: {
    assignee: string[];
    tags: string[];
    startDate: string;
    dueDate: string;
    priority: Priority;
  };
  setFormState: (state: Partial<Task>) => void;
  availableAssignees: string[];
  availableLabels: string[];
  createdDate: string;
  updatedDate: string;
};

export default function TaskDetails({
  formState,
  setFormState,
  availableAssignees,
  availableLabels,
  createdDate,
  updatedDate,
}: TaskDetailsProps) {
  return (
    <div className="w-2/5 p-6 overflow-y-auto bg-slate-50">
      <h3 className="text-lg font-medium mb-6 flex items-center justify-between">
        Details
      </h3>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Assignee</label>
          <Select
            value={formState.assignee[0] || ""}
            onValueChange={(value) => setFormState({ assignee: [value] })}
          >
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue placeholder="Unassigned">
                {formState.assignee.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/placeholder/30/30" alt="User avatar" />
                      <AvatarFallback>
                        {formState.assignee[0][0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{formState.assignee[0]}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableAssignees.map((user) => (
                <SelectItem key={user} value={user}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/placeholder/30/30" alt="User avatar" />
                      <AvatarFallback>{user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{user}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Labels</label>
          <Select
            onValueChange={(value) =>
              setFormState({
                tags: formState.tags.includes(value)
                  ? formState.tags
                  : [...formState.tags, value],
              })
            }
          >
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue placeholder="Add labels" />
            </SelectTrigger>
            <SelectContent>
              {availableLabels.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 flex flex-wrap gap-1">
            {formState.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-blue-50 text-blue-800 border-blue-200"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() =>
                    setFormState({
                      tags: formState.tags.filter((t) => t !== tag),
                    })
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Start date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-gray-300 bg-white"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formState.startDate
                  ? format(new Date(formState.startDate), "MMM dd, yyyy")
                  : "Set start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formState.startDate ? new Date(formState.startDate) : undefined}
                onSelect={(date) =>
                  setFormState({
                    startDate: date ? format(date, "yyyy-MM-dd") : "",
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Due date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal border-gray-300 bg-white ${
                  formState.dueDate && new Date(formState.dueDate) < new Date()
                    ? "text-red-500"
                    : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formState.dueDate
                  ? format(new Date(formState.dueDate), "MMM dd, yyyy")
                  : "Set due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formState.dueDate ? new Date(formState.dueDate) : undefined}
                onSelect={(date) =>
                  setFormState({
                    dueDate: date ? format(date, "yyyy-MM-dd") : "",
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Priority</label>
          <Select
            value={formState.priority}
            onValueChange={(value) => setFormState({ priority: value as Priority })}
          >
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>Low</span>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <span>Medium</span>
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  <span>High</span>
                </div>
              </SelectItem>
              <SelectItem value="critical">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <span>Critical</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Created</label>
          <div className="text-sm text-gray-500">{createdDate}</div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2 text-gray-600">Updated</label>
          <div className="text-sm text-gray-500">{updatedDate}</div>
        </div>
      </div>
    </div>
  );
}