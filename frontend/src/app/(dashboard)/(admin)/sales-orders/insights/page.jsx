"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
    Line, AreaChart, Area, BarChart, Bar, 
    ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, ComposedChart, Cell
  } from "recharts"
import { Brain, Lightbulb, Target, AlertTriangle, TrendingUp, Zap } from "lucide-react"

// Mock forecast data
const mockForecastData = [
    { month: "Jan", actual: 4000, predicted: 4100, lower: 3900, upper: 4300 },
    { month: "Feb", actual: 4500, predicted: 4600, lower: 4400, upper: 4800 },
    { month: "Mar", actual: 5100, predicted: 5000, lower: 4800, upper: 5200 },
    { month: "Apr", actual: null, predicted: 5600, lower: 5300, upper: 5900 },
    { month: "May", actual: null, predicted: 6200, lower: 5900, upper: 6500 },
    { month: "Jun", actual: null, predicted: 6800, lower: 6500, upper: 7100 },
  ];
  

export default function SalesForecastPage() {
  const [forecastRange, setForecastRange] = useState("6m")

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">AI Sales Forecast & Insights</h2>
          <p className="text-sm text-gray-500">Predictive analytics and intelligent insights</p>
        </div>
      </div>

      {/* AI Prediction Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <p className="text-sm font-medium text-gray-500">AI Confidence Score</p>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-2">87%</h3>
                <p className="text-xs sm:text-sm text-purple-600">High prediction reliability</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <p className="text-sm font-medium text-gray-500">Forecast Accuracy</p>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-2">92.5%</h3>
                <p className="text-xs sm:text-sm text-yellow-600">Based on historical predictions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full sm:col-span-2 md:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <p className="text-sm font-medium text-gray-500">Prediction Window</p>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-2">180 Days</h3>
                <p className="text-xs sm:text-sm text-blue-600">Rolling forecast period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Forecast Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg sm:text-xl">AI Sales Forecast</CardTitle>
              <Select value={forecastRange} onValueChange={setForecastRange}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Forecast Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="12m">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-60 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockForecastData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                    name="Actual Sales"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10B981"
                    strokeDasharray="5 5"
                    fill="#10B981"
                    fillOpacity={0.1}
                    name="AI Prediction"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Prediction Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {mockForecastData.slice(-3).map((data, index) => (
                <div key={index} className="flex items-center gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <h4 className="text-sm sm:text-base font-medium">{data.month} Forecast</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      ${data.predicted.toLocaleString()} (±${(data.predicted * 0.05).toFixed(0)})
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {data.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">AI Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-700 flex items-center gap-2 text-sm sm:text-base">
                <TrendingUp className="h-4 w-4" />
                Growth Strategy
              </h4>
              <p className="text-xs sm:text-sm text-blue-600 mt-2">
                Based on seasonality patterns, optimal timing for new product launches would be early Q3. Historical data suggests 23% higher adoption rates during this period.
              </p>
            </div>
            
            <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-700 flex items-center gap-2 text-sm sm:text-base">
                <AlertTriangle className="h-4 w-4" />
                Risk Mitigation
              </h4>
              <p className="text-xs sm:text-sm text-yellow-600 mt-2">
                Prediction models indicate potential market saturation in current segments. Consider diversifying into emerging market segments with 45% growth potential.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Insights Feed */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Actionable Insights</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {[
              {
                type: "opportunity",
                title: "Price Optimization",
                description: "Consider 5-10% price increase for Product A based on market analysis and demand patterns.",
                impact: "High Impact",
                color: "bg-blue-100 text-blue-800 hover:bg-blue-200"
              },
              {
                type: "risk",
                title: "Customer Churn Risk",
                description: "10 high-value customers showing decreased engagement. Implement retention strategy.",
                impact: "Critical",
                color: "bg-red-100 text-red-800 hover:bg-red-200"
              },
              {
                type: "insight",
                title: "Market Expansion",
                description: "Data suggests strong potential for market expansion in the Western region.",
                impact: "Medium Impact",
                color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              },
            ].map((insight, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex-grow w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                    <h4 className="text-sm sm:text-base font-medium">{insight.title}</h4>
                    <Badge className={`${insight.color} text-xs`}>
                      {insight.impact}
                    </Badge>
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
    </div>
  )
}