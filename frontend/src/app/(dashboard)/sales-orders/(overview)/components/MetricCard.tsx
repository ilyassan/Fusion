import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  iconColor: string;
  subText?: string;
  growth?: number;
}

export function MetricCard({ title, value, Icon, iconColor, subText, growth }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {growth !== undefined ? (
          <div className="flex items-center mt-1">
            <span className={`text-sm ${growth >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {growth >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(growth)}%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        ) : subText ? (
          <div className="text-gray-500 text-sm mt-1">{subText}</div>
        ) : null}
      </CardContent>
    </Card>
  );
}