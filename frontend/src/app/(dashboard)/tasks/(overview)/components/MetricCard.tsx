import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  iconColor: string;
  subText?: string;
}

export function MetricCard({ title, value, Icon, iconColor, subText }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subText && <div className="text-gray-500 text-sm mt-1">{subText}</div>}
      </CardContent>
    </Card>
  );
}