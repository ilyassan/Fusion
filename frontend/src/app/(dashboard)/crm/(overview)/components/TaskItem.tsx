import { TaskData } from "./UpcomingTasks";

interface TaskItemProps {
  task: TaskData;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
      <div className="w-2 h-2 rounded-full bg-blue-500" />
      <div>
        <p className="font-medium">{task.task}</p>
        <p className="text-sm text-gray-500">{task.contact}</p>
        <p className="text-xs text-gray-400">{task.time}</p>
      </div>
    </div>
  );
};