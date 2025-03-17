"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, PlayCircle, ListChecks } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskItemContent from "./TaskItemContent";
import { KanbanData, Task, TaskStatus } from "../types/KanbanTypes";
import { useState } from "react";
import KanbanBoardSkeleton from "./KanbanBoardSkeleton";
import AddTaskModal from "./AddTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import { Button } from "@/components/ui/button";

type KanbanBoardProps = {
  tasks: KanbanData;
  setTasks: React.Dispatch<React.SetStateAction<KanbanData>>;
  isLoading: boolean;
  updateTask: (taskId: string, updatedData: Partial<Task>) => void;
  isAddTaskModalOpen: boolean;
  setIsAddTaskModalOpen: (open: boolean) => void;
  targetStatus: TaskStatus | null;
  setTargetStatus: (status: TaskStatus | null) => void;
  addTask: (taskData: Partial<Task>, status: TaskStatus) => void;
  selectedTasks: string[];
  setSelectedTasks: (taskIds: string[]) => void;
};

export default function KanbanBoard({
  tasks,
  setTasks,
  isLoading,
  updateTask,
  isAddTaskModalOpen,
  setIsAddTaskModalOpen,
  targetStatus,
  setTargetStatus,
  addTask,
  selectedTasks,
  setSelectedTasks,
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeStage = active.data.current?.status as TaskStatus;
    setActiveTask(tasks[activeStage].find((task) => task.id === active.id) || null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeStage = active.data.current?.status as TaskStatus;
    const overStage = (over.data.current?.sortable?.containerId || over.id) as TaskStatus;

    if (!overStage) return;

    if (activeStage !== overStage || active.id !== over.id) {
      setTasks((prev: KanbanData) => {
        const activeItems = [...(prev[activeStage] || [])];
        const overItems = [...(prev[overStage] || [])];
        const activeIndex = activeItems.findIndex((item) => item.id === active.id);
        const overIndex =
          over.data.current?.sortable && over.id !== overStage
            ? overItems.findIndex((item) => item.id === over.id)
            : overItems.length;

        if (activeStage === overStage) {
          const newItems = arrayMove(overItems, activeIndex, overIndex);
          return { ...prev, [overStage]: newItems };
        } else {
          const [movedItem] = activeItems.splice(activeIndex, 1);
          overItems.splice(overIndex, 0, { ...movedItem, status: overStage });
          return {
            ...prev,
            [activeStage]: activeItems,
            [overStage]: overItems,
          };
        }
      });
    }
    setActiveTask(null);
  };

  const handleDetailsClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const stages = [
    { id: "todo", title: "To Do", icon: ListChecks },
    { id: "inprogress", title: "In Progress", icon: PlayCircle },
    { id: "completed", title: "Completed", icon: CheckCircle2 },
  ];

  if (isLoading) {
    return <KanbanBoardSkeleton />;
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.map((stage) => (
            <DroppableStage
              key={stage.id}
              stageId={stage.id as TaskStatus}
              title={stage.title}
              icon={stage.icon}
              tasks={tasks[stage.id as TaskStatus] || []}
              onDetailsClick={handleDetailsClick}
              setIsAddTaskModalOpen={setIsAddTaskModalOpen}
              setTargetStatus={setTargetStatus}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
          ))}
        </div>
        <DragOverlay>{activeTask ? <TaskItemContent task={activeTask} /> : null}</DragOverlay>
      </DndContext>
      {targetStatus && (
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          setIsOpen={setIsAddTaskModalOpen}
          addTask={(taskData) => addTask(taskData, targetStatus)}
        />
      )}
    {selectedTask && (
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          task={selectedTask}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedTask(null);
          }}
          updateTask={(taskId, updatedData) => {
            updateTask(taskId, updatedData);
            setSelectedTask((prev) =>
              prev ? { ...prev, ...updatedData } : null
            );
          }}
          availableAssignees={["user1", "user2", "user3"]}
          availableLabels={["bug", "feature", "enhancement"]}
        />
      )}
    </>
  );
}

const DroppableStage = ({
  stageId,
  title,
  icon: Icon,
  tasks,
  onDetailsClick,
  setIsAddTaskModalOpen,
  setTargetStatus,
  selectedTasks,
  setSelectedTasks,
}: {
  stageId: TaskStatus;
  title: string;
  icon: React.ElementType;
  tasks: Task[];
  onDetailsClick: (task: Task) => void;
  setIsAddTaskModalOpen: (open: boolean) => void;
  setTargetStatus: (status: TaskStatus | null) => void;
  selectedTasks: string[];
  setSelectedTasks: (taskIds: string[]) => void;
}) => {
  const { setNodeRef } = useDroppable({
    id: stageId,
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-gray-500" />
            {title}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{tasks.length}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTargetStatus(stageId);
                setIsAddTaskModalOpen(true);
              }}
            >
              Add Task
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <SortableContext
          id={stageId}
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <ScrollArea className="max-h-[500px]">
            <div ref={setNodeRef} className="p-2 space-y-2 min-h-[50px]">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    status={stageId}
                    onDetailsClick={onDetailsClick}
                    isSelected={selectedTasks.includes(task.id)}
                    onSelectChange={(isSelected) =>
                      setSelectedTasks(
                        isSelected
                          ? [...selectedTasks, task.id]
                          : selectedTasks.filter((id) => id !== task.id)
                      )
                    }
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 text-sm py-4">Drop tasks here</div>
              )}
            </div>
          </ScrollArea>
        </SortableContext>
      </CardContent>
    </Card>
  );
};