export type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  assignee: string[];
  startDate: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  comments: Comment[];
  activityLog: Activity[];
};

export type Comment = {
  id: string;
  author: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
};

export type Activity = {
  id: string;
  type: "created" | "updated" | "status_change" | "priority_change" | "comment_added" | "assigned" | "deadline_change" | "other"; // Add type field
  description: string;
  author: string;
  avatarUrl: string;
  timestamp: string;
  details?: { from?: string; to?: string };
};

export type Priority = "low" | "medium" | "high" | "critical";
export type TaskStatus = "todo" | "inprogress" | "completed";

export type Filters = {
  keyword: string;
  priority: Priority | "";
};

export type KanbanData = {
  [key in TaskStatus]: Task[];
};