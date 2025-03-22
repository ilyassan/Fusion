"use client";

import { useState } from "react";
import { Notification } from "../lib/types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "general",
    title: "Welcome to Fusion ERP",
    message: "We're excited to have you on board! Check out your dashboard to get started.",
    timestamp: "2025-03-22T08:45:00Z",
    read: false,
    icon: <Info className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "2",
    type: "general",
    title: "Password Changed",
    message: "Your password was successfully updated on 2025-03-21.",
    timestamp: "2025-03-21T15:30:00Z",
    read: true,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    id: "3",
    type: "general",
    title: "Email from Fusion ERP",
    message: "You received a new email: 'Q1 Goals Review' from support@fusionerp.com.",
    timestamp: "2025-03-20T09:15:00Z",
    read: false,
    icon: <Info className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "4",
    type: "companies",
    title: "New Task Assigned",
    message: "Task 'Client Presentation Prep' assigned to you, due 2025-03-26.",
    timestamp: "2025-03-22T10:00:00Z",
    read: false,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    id: "5",
    type: "companies",
    title: "New Comment on Your Assigned Task",
    message: "Sarah added: 'Please include Q2 projections' on 'Client Presentation Prep'.",
    timestamp: "2025-03-22T11:20:00Z",
    read: false,
    icon: <Info className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "6",
    type: "companies",
    title: "Company Announcement",
    message: "All-hands meeting scheduled for 2025-03-24 at 2 PM EST.",
    timestamp: "2025-03-21T14:00:00Z",
    read: true,
    icon: <Bell className="w-5 h-5 text-gray-500" />,
  },
  {
    id: "7",
    type: "billing",
    title: "Payment Failure",
    message: "Payment for your $99/month plan failed. Please update your payment method.",
    timestamp: "2025-03-19T09:00:00Z",
    read: false,
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
  },
  {
    id: "8",
    type: "billing",
    title: "Subscription Expiry Alert",
    message: "Your Pro Plan expires in 5 days on 2025-03-27. Renew now to avoid interruption.",
    timestamp: "2025-03-22T07:30:00Z",
    read: false,
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  },
  {
    id: "9",
    type: "billing",
    title: "Subscription Expiry Alert",
    message: "Reminder: Your Pro Plan expires tomorrow, 2025-03-23. Action required.",
    timestamp: "2025-03-22T12:00:00Z",
    read: false,
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, markAsRead, markAllAsRead, unreadCount };
}

// Import these icons at the top of the file
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";