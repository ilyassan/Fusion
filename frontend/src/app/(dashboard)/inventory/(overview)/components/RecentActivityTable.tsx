import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchRecentActivityData } from "../data/fetchRecentActivityData";

export async function RecentActivityTable() {
  const recentActivity = await fetchRecentActivityData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest stock movements and restocks</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <Badge variant={activity.type === "Restock" ? "default" : "secondary"}>
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell>{activity.item}</TableCell>
                <TableCell>
                  <span className={activity.quantity > 0 ? "text-green-600" : "text-red-600"}>
                    {activity.quantity > 0 ? "+" : ""}
                    {activity.quantity}
                  </span>
                </TableCell>
                <TableCell>{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}