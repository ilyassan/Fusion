import { useState, useEffect } from "react";
import { KanbanData, Task, Filters, TaskStatus } from "../types/KanbanTypes";
import { fetchTasks, fetchFilteredTasks } from "../data";

export const useKanban = () => {
  const [tasks, setTasks] = useState<KanbanData>({
    todo: [],
    inprogress: [],
    completed: [],
  });
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    priority: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"kanban" | "list" | "calendar">("kanban");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<TaskStatus | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const loadFilteredTasks = async () => {
      setIsLoading(true);
      const filteredTasks = await fetchFilteredTasks(filters);
      setTasks(filteredTasks);
      setIsLoading(false);
    };
    loadFilteredTasks();
  }, [filters]);

  const addTask = (taskData: Partial<Task>, status: TaskStatus) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || "New Task",
      description: taskData.description || "",
      project: taskData.project || "Unassigned",
      assignee: taskData.assignee || [],
      startDate: taskData.startDate || new Date().toISOString().split("T")[0],
      dueDate: taskData.dueDate || "",
      priority: taskData.priority || "low",
      status,
      tags: taskData.tags || [],
      comments: [],
      activityLog: [],
    };
    setTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], newTask],
    }));
  };

  const updateTask = (taskId: string, updatedData: Partial<Task>) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach((status) => {
        newTasks[status as TaskStatus] = newTasks[status as TaskStatus].map((task) =>
          task.id === taskId ? { ...task, ...updatedData } : task
        );
      });
      return newTasks;
    });
  };

  const deleteTasks = (taskIds: string[]) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach((status) => {
        newTasks[status as TaskStatus] = newTasks[status as TaskStatus].filter(
          (task) => !taskIds.includes(task.id)
        );
      });
      return newTasks;
    });
    setSelectedTasks([]);
  };

  const bulkAssign = (taskIds: string[], assignee: string) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach((status) => {
        newTasks[status as TaskStatus] = newTasks[status as TaskStatus].map((task) =>
          taskIds.includes(task.id)
            ? { ...task, assignee: [...task.assignee, assignee] }
            : task
        );
      });
      return newTasks;
    });
  };

  const bulkChangeStatus = (taskIds: string[], newStatus: TaskStatus) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      const movedTasks: Task[] = [];
      Object.keys(newTasks).forEach((status) => {
        const tasksToMove = newTasks[status as TaskStatus].filter((task) =>
          taskIds.includes(task.id)
        );
        movedTasks.push(...tasksToMove);
        newTasks[status as TaskStatus] = newTasks[status as TaskStatus].filter(
          (task) => !taskIds.includes(task.id)
        );
      });
      newTasks[newStatus] = [...newTasks[newStatus], ...movedTasks];
      return newTasks;
    });
    setSelectedTasks([]);
  };

  return {
    tasks,
    setTasks,
    filters,
    setFilters,
    isLoading,
    selectedTasks,
    setSelectedTasks,
    viewMode,
    setViewMode,
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    targetStatus,
    setTargetStatus,
    addTask,
    updateTask,
    deleteTasks,
    bulkAssign,
    bulkChangeStatus,
  };
};