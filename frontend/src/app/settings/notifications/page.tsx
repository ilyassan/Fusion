"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "./hooks/useNotifications";
import NotificationList from "./components/NotificationList";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-500">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="w-full border-b justify-start rounded-none space-x-4 bg-transparent h-auto pb-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            All{" "}
            <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">{notifications.length}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="general"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            General{" "}
            <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
              {notifications.filter((n) => n.type === "general").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="companies"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            Companies{" "}
            <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
              {notifications.filter((n) => n.type === "companies").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            Billing{" "}
            <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
              {notifications.filter((n) => n.type === "billing").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <NotificationList notifications={notifications} category="all" onMarkAsRead={markAsRead} />
        </TabsContent>

        <TabsContent value="general" className="mt-6">
          <NotificationList notifications={notifications} category="general" onMarkAsRead={markAsRead} />
        </TabsContent>

        <TabsContent value="companies" className="mt-6">
          <NotificationList notifications={notifications} category="companies" onMarkAsRead={markAsRead} />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <NotificationList notifications={notifications} category="billing" onMarkAsRead={markAsRead} />
        </TabsContent>
      </Tabs>
    </div>
  );
}