"use client";

import KanbanHeader from "./components/KanbanHeader";
import KanbanFilters from "./components/KanbanFilters";
import KanbanBoard from "./components/KanbanBoard";
import BulkActionsToolbar from "./components/BulkActionsToolbar";
import { useKanban } from "./hooks/useKanban";

export default function KanbanPage() {
  const {
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
  } = useKanban();

  if (viewMode !== "kanban") {
    return <div>Other views (List/Calendar) coming soon!</div>;
  }

  return (
    <div className="space-y-6 min-h-full">
      <KanbanHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <KanbanFilters filters={filters} setFilters={setFilters} />
      {selectedTasks.length > 0 && (
        <BulkActionsToolbar
          selectedTasks={selectedTasks}
          deleteTasks={deleteTasks}
          bulkAssign={bulkAssign}
          bulkChangeStatus={bulkChangeStatus}
        />
      )}
      <KanbanBoard
        tasks={tasks}
        setTasks={setTasks}
        isLoading={isLoading}
        updateTask={updateTask}
        isAddTaskModalOpen={isAddTaskModalOpen}
        setIsAddTaskModalOpen={setIsAddTaskModalOpen}
        targetStatus={targetStatus}
        setTargetStatus={setTargetStatus}
        addTask={addTask}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
      />
    </div>
  );
}