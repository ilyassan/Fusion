import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

export interface ConversionMetricsData {
  leadToOpportunity: number;
  opportunityToProposal: number;
  proposalToClose: number;
  averageTimeToClose: number;
}

interface ConversionMetricsProps {
  data: ConversionMetricsData;
}

export const ConversionMetrics = ({ data }: ConversionMetricsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          Conversion Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="font-medium">
                  {value}
                  {key.includes("Time") ? " days" : "%"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${value}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};