"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import { Users, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";

export function DealsBoardSkeleton() {
  const stages = [
    { id: "lead-capture", title: "Lead Capture", icon: Users },
    { id: "proposal", title: "Proposal", icon: DollarSign },
    { id: "negotiation", title: "Negotiation", icon: ArrowRight },
    { id: "closing", title: "Closing", icon: CheckCircle2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stages.map((stage) => (
        <Card key={stage.id} className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stage.icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{stage.title}</span>
              </div>
              <Skeleton className="h-5 w-8 rounded-full" /> {/* Badge */}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-2 space-y-2">
              {/* Simulate 3 deal items */}
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}