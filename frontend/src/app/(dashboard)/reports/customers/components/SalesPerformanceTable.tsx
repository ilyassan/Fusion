import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchSalesPerformanceData } from "../data/fetchSalesPerformanceData";

interface SalesPerformanceTableProps {
  dateRange: string;
}

export async function SalesPerformanceTable({ dateRange }: SalesPerformanceTableProps) {
  const salesPerformance = await fetchSalesPerformanceData(dateRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Individual sales representative performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sales Representative</TableHead>
              <TableHead className="text-right">Deals Closed</TableHead>
              <TableHead className="text-right">Revenue Generated</TableHead>
              <TableHead className="text-right">Conversion Rate</TableHead>
              <TableHead>Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesPerformance.map((rep) => (
              <TableRow key={rep.rep}>
                <TableCell className="font-medium">{rep.rep}</TableCell>
                <TableCell className="text-right">{rep.deals}</TableCell>
                <TableCell className="text-right">${rep.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">{rep.conversion}%</TableCell>
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