import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Define the type for each performance metric
interface PerformanceMetric {
  metric: string
  current: number
  target: number
}

// Define props type for the component
interface PerformanceMetricsProps {
  data: PerformanceMetric[]
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          Your Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((metric) => (
            <div key={metric.metric} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{metric.metric}</span>
                <span className="text-sm text-gray-500">{metric.current}%</span>
              </div>
              <Progress value={(metric.current / metric.target) * 100} className="h-2 [&>*]:bg-blue-600" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}