import { TaskMetrics, TaskPriority, TaskStatus, OverdueTask, TaskActivity } from "../types/taskTypes";

export async function fetchTaskMetrics(): Promise<TaskMetrics> {
  "use server";
  await new Promise((r) => setTimeout(r, 800));
  return {
    totalTasks: 120,
    pendingTasks: 30,
    inProgressTasks: 40,
    completedTasks: 50,
  };
}

export async function fetchTaskPriority(): Promise<TaskPriority[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000));
  return [
    { priority: "Low", count: 20 },
    { priority: "Medium", count: 40 },
    { priority: "High", count: 30 },
    { priority: "Critical", count: 10 },
  ];
}

export async function fetchTaskStatus(): Promise<TaskStatus[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000));
  return [
    { status: "To Do", count: 30 },
    { status: "In Progress", count: 40 },
    { status: "Done", count: 50 },
  ];
}

export async function fetchOverdueTasks(): Promise<OverdueTask[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000));
  return [
    { id: "1", name: "Review PRs", priority: "High", dueDate: "2025-03-10", assignedTo: "Dave" },
    { id: "2", name: "Update API", priority: "Critical", dueDate: "2025-03-12", assignedTo: "Eve" },
    { id: "3", name: "Test Features", priority: "Medium", dueDate: "2025-03-11", assignedTo: "Frank" },
    { id: "4", name: "Plan Sprint", priority: "High", dueDate: "2025-03-09", assignedTo: "Grace" },
    { id: "5", name: "Client Meeting", priority: "Low", dueDate: "2025-03-08", assignedTo: "Hank" },
  ];
}

export async function fetchRecentActivities(): Promise<TaskActivity[]> {
  "use server";
  await new Promise((r) => setTimeout(r, 1000));
  return [
    {
      id: "1",
      action: "added",
      taskName: "Design Homepage",
      details: "Added a new task",
      employee: "Alice",
      timestamp: "2025-03-15T10:30:00Z",
    },
    {
      id: "2",
      action: "commented",
      taskName: "Fix Bugs",
      details: "Commented: Found a critical issue in the API",
      employee: "Bob",
      timestamp: "2025-03-15T09:15:00Z",
    },
    {
      id: "3",
      action: "status_changed",
      taskName: "Write Docs",
      details: "Changed status to Completed",
      employee: "Charlie",
      timestamp: "2025-03-14T14:20:00Z",
    }
  ];
}