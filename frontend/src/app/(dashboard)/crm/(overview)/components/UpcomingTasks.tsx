import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { TaskItem } from "./TaskItem";

export interface TaskData {
  task: string;
  contact: string;
  time: string;
}

interface UpcomingTasksProps {
  tasks: TaskData[];
}

export const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-500" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};