"use client";

import { Button } from "@/components/ui/button";
import { Notification } from "../lib/types";

export default function NotificationItem({ notif, onMarkAsRead }: { notif: Notification; onMarkAsRead: (id: string) => void }) {
  return (
    <div
      className={`flex items-start gap-4 p-4 border-b border-gray-200 ${
        notif.read ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-100 transition-colors`}
    >
      <div className="flex-shrink-0">{notif.icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-medium ${notif.read ? "text-gray-600" : "text-gray-900"}`}>
            {notif.title}
          </h3>
          <span className="text-xs text-gray-500">
            {new Date(notif.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · {new Date(notif.timestamp).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
        {!notif.read && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-blue-600 hover:text-blue-800"
            onClick={() => onMarkAsRead(notif.id)}
          >
            Mark as Read
          </Button>
        )}
      </div>
    </div>
  );
}