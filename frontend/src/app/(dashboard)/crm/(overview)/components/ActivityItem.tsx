import { PhoneCall, Mail, Users, Activity } from "lucide-react";
import { ActivityData } from "./RecentActivities"; // Import from parent

interface ActivityItemProps {
  activity: ActivityData;
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const iconMap = {
    call: <PhoneCall className="h-4 w-4 mt-1 text-green-500" />,
    email: <Mail className="h-4 w-4 mt-1 text-blue-500" />,
    meeting: <Users className="h-4 w-4 mt-1 text-purple-500" />,
    task: <Activity className="h-4 w-4 mt-1 text-orange-500" />,
  };

  return (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
      {iconMap[activity.type]}
      <div>
        <p className="font-medium">{activity.contact}</p>
        <p className="text-sm text-gray-500">{activity.company}</p>
        <p className="text-xs text-gray-400">{activity.time}</p>
      </div>
    </div>
  );
};