"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationItem from "./NotificationItem";
import { Notification } from "../lib/types";

export default function NotificationList({
  notifications,
  category,
  onMarkAsRead,
}: {
  notifications: Notification[];
  category: "all" | "general" | "companies" | "billing";
  onMarkAsRead: (id: string) => void;
}) {
  const filteredNotifications =
    category === "all"
      ? notifications
      : notifications.filter((n) => n.type === category);

  const title =
    category === "all"
      ? "All Notifications"
      : category === "general"
      ? "General Notifications"
      : category === "companies"
      ? "Companies Notifications"
      : "Billing Alerts";

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationItem key={notif.id} notif={notif} onMarkAsRead={onMarkAsRead} />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No {category === "all" ? "" : category} notifications.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}