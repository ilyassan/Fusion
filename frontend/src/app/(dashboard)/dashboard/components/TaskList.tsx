import { ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Task {
  id: number;
  title: string;
  status: string;
  priority?: string;
  assignee?: string;
  due: string;
}

interface TaskListProps {
  tasks: Task[];
  title?: string;
}

export function TaskList({ tasks, title = "Recent Tasks" }: TaskListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-indigo-600" />
            {title}
          </CardTitle>
          <Button variant="ghost" className="text-sm h-fit pt-0 text-indigo-600 hover:text-indigo-700">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              {tasks[0]?.priority && <TableHead>Priority</TableHead>}
              {tasks[0]?.assignee && <TableHead>Assignee</TableHead>}
              <TableHead>Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      task.status === "Completed"
                        ? "bg-emerald-100 text-emerald-600"
                        : task.status === "In Progress"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </TableCell>
                {task.priority && <TableCell>{task.priority}</TableCell>}
                {task.assignee && <TableCell>{task.assignee}</TableCell>}
                <TableCell>{task.due}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}