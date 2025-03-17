"use client";

import { Activity } from "../../types/KanbanTypes";
import { formatDistanceToNow, format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Edit, 
  Tag, 
  MessageSquare, 
  UserPlus,
  Calendar,
  ArrowRight,
  Flag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ActivityLogProps = {
  activityLog: Activity[];
};

export default function ActivityLog({ activityLog }: ActivityLogProps) {
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "created":
        return <CheckCircle2 className="text-green-500" size={16} />;
      case "updated":
        return <Edit className="text-blue-500" size={16} />;
      case "status_change":
        return <ArrowRight className="text-purple-500" size={16} />;
      case "priority_change":
        return <Flag className="text-orange-500" size={16} />;
      case "comment_added":
        return <MessageSquare className="text-indigo-500" size={16} />;
      case "assigned":
        return <UserPlus className="text-cyan-500" size={16} />;
      case "deadline_change":
        return <Calendar className="text-amber-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  // Function to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Function to format timestamp for tooltip
  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="space-y-1 mt-4">
      <h3 className="text-lg font-semibold mb-3">Activity Log</h3>
      
      {activityLog.length === 0 ? (
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Clock className="mx-auto text-gray-400 mb-2" size={24} />
            <p className="text-gray-500">No activity recorded yet.</p>
          </div>
        </div>
      ) : (
        <div className="relative pl-6 border-l-2 border-gray-200">
          {activityLog.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`pb-4 relative ${index === activityLog.length - 1 ? "" : ""}`}
            >
              {/* Timeline node */}
              <div className="absolute -left-[25px] p-1 bg-white rounded-full border-2 border-gray-200">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="ml-2">
                <div className="flex items-start gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.avatarUrl || "/api/placeholder/24/24"} alt={activity.author} />
                    <AvatarFallback className="text-xs">{getInitials(activity.author)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline flex-wrap gap-x-2">
                      <span className="font-medium text-sm">{activity.author}</span>
                      
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 ${
                          activity.type === "created" ? "bg-green-50 text-green-700 border-green-200" :
                          activity.type === "status_change" ? "bg-purple-50 text-purple-700 border-purple-200" :
                          activity.type === "priority_change" ? "bg-orange-50 text-orange-700 border-orange-200" :
                          activity.type === "comment_added" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                          activity.type === "assigned" ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                          activity.type === "deadline_change" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {activity.type.replace("_", " ")}
                      </Badge>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(activity.timestamp))} ago
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{formatTimestamp(activity.timestamp)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <p className="text-sm mt-1">{activity.description}</p>
                    
                    {activity.details && (
                      <div className="mt-1 text-xs bg-gray-50 p-2 rounded border border-gray-200">
                        <div className="flex gap-2">
                          {activity.details.from && (
                            <span>
                              <span className="text-gray-500">From:</span> {activity.details.from}
                            </span>
                          )}
                          
                          {activity.details.to && (
                            <>
                              {activity.details.from && <ArrowRight size={12} className="text-gray-400" />}
                              <span>
                                <span className="text-gray-500">To:</span> {activity.details.to}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}