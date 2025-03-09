import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { AnimatedValue } from "./AnimatedValue";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  valueClassName?: string;
  disableAnimation?: boolean;
}

export function MetricCard({
  title,
  value,
  icon,
  valueClassName,
  disableAnimation
}: MetricCardProps) {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
      <CardContent className="pt-6 flex items-center">
        <span className="mr-4">{icon}</span>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`text-lg md:text-2xl font-bold ${valueClassName || "text-gray-900"}`}>
            { disableAnimation ? value : <AnimatedValue value={value} /> }
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}