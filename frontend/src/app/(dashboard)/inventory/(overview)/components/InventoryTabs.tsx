"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryHealthData } from "../data/fetchInventoryHealthData";

const InventoryTabs = ({ healthData }: { healthData : InventoryHealthData }) => {
  return (
    <Tabs defaultValue="turnover">
    <TabsList>
      <TabsTrigger value="turnover">Inventory Turnover</TabsTrigger>
      <TabsTrigger value="aging">Inventory Aging</TabsTrigger>
      <TabsTrigger value="accuracy">Inventory Accuracy</TabsTrigger>
    </TabsList>
    <TabsContent value="turnover">
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span>Average Turnover Rate:</span>
          <span className="font-bold">{healthData.turnover.averageRate} times/year</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Best Performing Category:</span>
          <span className="font-bold">{healthData.turnover.bestCategory}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Slowest Moving Category:</span>
          <span className="font-bold">{healthData.turnover.slowestCategory}</span>
        </div>
      </div>
    </TabsContent>
    <TabsContent value="aging">
      <div className="mt-4 space-y-4">
        {Object.entries(healthData.aging).map(([range, percentage]) => (
          <div key={range} className="flex items-center justify-between">
            <span>{range}:</span>
            <span className={`font-bold ${range === "90+ days" ? "text-red-500" : ""}`}>
              {percentage}%
            </span>
          </div>
        ))}
      </div>
    </TabsContent>
    <TabsContent value="accuracy">
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span>Overall Accuracy Rate:</span>
          <span className="font-bold">{healthData.accuracy.overallRate}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Last Cycle Count:</span>
          <span className="font-bold">{healthData.accuracy.lastCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Next Scheduled Count:</span>
          <span className="font-bold">{healthData.accuracy.nextCount}</span>
        </div>
      </div>
    </TabsContent>
  </Tabs>
  )
}

export default InventoryTabs