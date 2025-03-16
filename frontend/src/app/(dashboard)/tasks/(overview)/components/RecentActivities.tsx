import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskActivity } from "../types/taskTypes";

interface RecentActivitiesProps {
  data: TaskActivity[];
}

export function RecentActivities({ data }: RecentActivitiesProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.slice(0, 5).map((activity) => (
            <li key={activity.id} className="p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">
                    {activity.employee}{" "}
                    {activity.action === "added" && "added a new task"}
                    {activity.action === "commented" && "commented on"}
                    {activity.action === "status_changed" && "changed status of"}{" "}
                    <span className="text-blue-600">{activity.taskName}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function RecentActivitiesSkeleton() {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <li key={i} className="p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}