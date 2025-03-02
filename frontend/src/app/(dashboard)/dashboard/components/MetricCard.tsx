import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { AnimatedValue } from "./AnimatedValue";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: string;
  subValue?: string;
}

export function MetricCard({ title, value, icon: Icon, change, changeType, subValue }: MetricCardProps) {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="p-1.5 bg-indigo-50 rounded-lg">
          <Icon className="h-4 w-4 text-indigo-600" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          <AnimatedValue value={value} />
        </div>
        {subValue ? (
          <div className="text-xs text-gray-500 mt-0.5">{subValue}</div>
        ) : (
          <div
            className={`flex items-center text-xs mt-0.5 ${
              changeType === "increase" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {changeType === "increase" ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}