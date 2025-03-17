import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OverdueTask } from "../types/taskTypes";

interface OverdueTasksListProps {
  data: OverdueTask[];
}

export function OverdueTasksList({ data }: OverdueTasksListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 3 Overdue Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.slice(0, 3).map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-800">{task.name}</p>
                <p className="text-sm text-gray-500">
                  Assigned to: {task.assignedTo} | Due: {task.dueDate}
                </p>
              </div>
              <span
                className={`text-sm px-2 py-1 rounded text-white ${
                  task.priority === "Critical"
                    ? "bg-green-700"
                    : task.priority === "High"
                    ? "bg-green-500"
                    : task.priority === "Medium"
                    ? "bg-purple-500"
                    : "bg-gray-400"
                }`}
              >
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function OverdueTasksListSkeleton() {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}