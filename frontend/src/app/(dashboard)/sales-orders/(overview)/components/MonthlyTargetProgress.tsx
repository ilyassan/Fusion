import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonthlyTargets } from "../types/salesTypes";

interface MonthlyTargetProgressProps {
  data: MonthlyTargets;
}

export function MonthlyTargetProgress({ data }: MonthlyTargetProgressProps) {
  const progressPercentage = (data.current / data.forecast) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Target Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Current</span>
            <span className="font-bold">${data.current.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Forecast: ${data.forecast.toLocaleString()}</span>
            <span className="text-blue-600 font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}