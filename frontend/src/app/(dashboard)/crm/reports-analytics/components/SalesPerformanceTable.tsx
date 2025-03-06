import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SalesPerformance } from "../types/AnalyticsTypes";

interface SalesPerformanceTableProps {
  data: SalesPerformance[];
}

export function SalesPerformanceTable({ data }: SalesPerformanceTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Individual sales representative performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Deals Closed</TableHead>
              <TableHead>Revenue Generated</TableHead>
              <TableHead>Conversion Rate</TableHead>
              <TableHead>Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((rep) => (
              <TableRow key={rep.rep}>
                <TableCell className="font-medium">{rep.rep}</TableCell>
                <TableCell>{rep.deals}</TableCell>
                <TableCell>${rep.revenue.toLocaleString()}</TableCell>
                <TableCell>{rep.conversion}%</TableCell>
                <TableCell>
                  <Badge variant={rep.conversion > 65 ? "default" : "secondary"}>
                    {rep.conversion > 65 ? "Above Target" : "Below Target"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}