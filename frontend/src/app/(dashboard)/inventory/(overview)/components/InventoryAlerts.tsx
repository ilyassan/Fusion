import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCwIcon } from "lucide-react";
import { fetchInventoryAlertsData } from "../data/fetchInventoryAlertsData";

export async function InventoryAlerts() {
  const alerts = await fetchInventoryAlertsData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Alerts</CardTitle>
        <CardDescription>Critical inventory issues requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center p-4 rounded-md ${
                alert.type === "low" ? "bg-yellow-100" : alert.type === "over" ? "bg-red-100" : "bg-blue-100"
              }`}
            >
              {alert.type === "low" || alert.type === "over" ? (
                <AlertTriangle
                  className={`h-6 w-6 mr-4 ${alert.type === "low" ? "text-yellow-600" : "text-red-600"}`}
                />
              ) : (
                <RefreshCwIcon className="h-6 w-6 text-blue-600 mr-4" />
              )}
              <div>
                <h4 className="font-semibold">{alert.title}</h4>
                <p className="text-sm">{alert.message}</p>
              </div>
              <Button variant="outline" className="ml-auto">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}