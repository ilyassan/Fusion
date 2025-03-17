export interface TaskMetrics {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

export interface TaskPriority {
  priority: string; // Low, Medium, High, Critical
  count: number;
}

export interface TaskCompletionHistory {
  period: string; // e.g., "Week 1", "Week 2"
  completed: number;
}

export interface OverdueTask {
  id: string;
  name: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
}

export interface TaskActivity {
  id: string;
  action: string; // e.g., "added", "commented", "status_changed"
  taskName: string;
  details: string; // e.g., "to In Progress", "Added a new task", "Commented: ..."
  employee: string;
  timestamp: string;
}

export interface TaskStatus {
  status: string; // To Do, In Progress, Done
  count: number;
}