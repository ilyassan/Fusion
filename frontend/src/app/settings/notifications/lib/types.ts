import { ReactNode } from "react";

export interface Notification {
  id: string;
  type: "general" | "companies" | "billing";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: ReactNode;
}