import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface RecommendationsProps {
  recommendations: {
    title: string;
    description: string;
    color: string;
    icon: "TrendingUp" | "AlertTriangle";
  }[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">AI Strategic Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index} className={`p-3 sm:p-4 bg-${rec.color}-50 rounded-lg`}>
              <h4 className={`font-medium text-${rec.color}-700 flex items-center gap-2 text-sm sm:text-base`}>
                {rec.icon === "TrendingUp" ? <TrendingUp className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                {rec.title}
              </h4>
              <p className={`text-xs sm:text-sm text-${rec.color}-600 mt-2`}>{rec.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}