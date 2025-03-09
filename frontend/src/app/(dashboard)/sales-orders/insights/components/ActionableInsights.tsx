import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActionableInsightsProps {
  insights: {
    type: string;
    title: string;
    description: string;
    impact: string;
    color: string;
  }[];
}

export default function ActionableInsights({ insights }: ActionableInsightsProps) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Actionable Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex-grow w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                  <h4 className="text-sm sm:text-base font-medium">{insight.title}</h4>
                  <Badge className={`${insight.color} text-xs`}>{insight.impact}</Badge>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{insight.description}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                Take Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}