"use client";

import { useState, useEffect } from "react";
import { Task, Filters } from "../board/types/KanbanTypes";
import { mockTasks } from "../board/data";
import TasksHeader from "./components/TasksHeader";
import TasksFilters from "./components/TasksFilters";
import TasksList from "./components/TasksList";

export default function MyTasksPage() {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [filters, setFilters] = useState<Filters>({ keyword: "", priority: "" });

  const currentUser = "user1";

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoadingTasks(true);

      // Simulate API call
      setTimeout(() => {
        const allTasks = Object.values(mockTasks).flat() as Task[];
        const filteredTasks = allTasks
          .filter((task) => task.assignee.includes(currentUser))
          .filter((task) =>
            filters.keyword
              ? task.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                task.description.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                task.tags.some((tag) => tag.toLowerCase().includes(filters.keyword.toLowerCase()))
              : true
          )
          .filter((task) => (filters.priority ? task.priority === filters.priority : true));

        setUserTasks(filteredTasks);
        setIsLoadingTasks(false);
      }, 800);
    };

    loadTasks();
  }, [filters]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <TasksHeader />
      <TasksFilters filters={filters} setFilters={setFilters} />
      <TasksList tasks={userTasks} isLoading={isLoadingTasks} />
    </div>
  );
}