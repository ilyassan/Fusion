import { Card, CardContent } from "@/components/ui/card";
import { Brain, Lightbulb, Target } from "lucide-react";

interface PredictionMetricsProps {
  metrics: {
    confidenceScore: { value: string; description: string; color: string };
    forecastAccuracy: { value: string; description: string; color: string };
    predictionWindow: { value: string; description: string; color: string };
  };
}

export default function PredictionMetrics({ metrics }: PredictionMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card className="w-full">
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Brain className={`h-5 w-5 text-${metrics.confidenceScore.color}-500`} />
                <p className="text-sm font-medium text-gray-500">AI Confidence Score</p>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mt-2">{metrics.confidenceScore.value}</h3>
              <p className={`text-xs sm:text-sm text-${metrics.confidenceScore.color}-600`}>{metrics.confidenceScore.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb className={`h-5 w-5 text-${metrics.forecastAccuracy.color}-500`} />
                <p className="text-sm font-medium text-gray-500">Forecast Accuracy</p>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mt-2">{metrics.forecastAccuracy.value}</h3>
              <p className={`text-xs sm:text-sm text-${metrics.forecastAccuracy.color}-600`}>{metrics.forecastAccuracy.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full sm:col-span-2 md:col-span-1">
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Target className={`h-5 w-5 text-${metrics.predictionWindow.color}-500`} />
                <p className="text-sm font-medium text-gray-500">Prediction Window</p>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mt-2">{metrics.predictionWindow.value}</h3>
              <p className={`text-xs sm:text-sm text-${metrics.predictionWindow.color}-600`}>{metrics.predictionWindow.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}