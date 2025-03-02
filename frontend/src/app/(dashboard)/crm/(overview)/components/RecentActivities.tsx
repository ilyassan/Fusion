import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { ActivityItem } from "./ActivityItem";

export interface ActivityData {
  type: "call" | "email" | "meeting" | "task";
  contact: string;
  company: string;
  time: string;
  status: string;
}

interface RecentActivitiesProps {
  activities: ActivityData[];
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};