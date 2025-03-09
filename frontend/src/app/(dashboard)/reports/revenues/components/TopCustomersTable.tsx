import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchTopCustomersData } from "../data/fetchTopCustomersData";

interface TopCustomersTableProps {
  dateRange: string;
}

export async function TopCustomersTable({ dateRange }: TopCustomersTableProps) {
  const topCustomers = await fetchTopCustomersData(dateRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers by Revenue</CardTitle>
        <CardDescription>High-value customers contributing most to earnings</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>% of Total Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCustomers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>${customer.revenue.toLocaleString()}</TableCell>
                <TableCell>{customer.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}