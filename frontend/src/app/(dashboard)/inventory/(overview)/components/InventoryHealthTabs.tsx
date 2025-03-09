import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchInventoryHealthData } from "../data/fetchInventoryHealthData";
import InventoryTabs from "./InventoryTabs";

export async function InventoryHealthTabs() {
  const healthData = await fetchInventoryHealthData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Health</CardTitle>
        <CardDescription>Overview of inventory status and turnover</CardDescription>
      </CardHeader>
      <CardContent>
        <InventoryTabs healthData={healthData}/>
      </CardContent>
    </Card>
  );
}