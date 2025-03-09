import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchHighCostTransactionsData } from "../data/fetchHighCostTransactionsData";

interface HighCostTransactionsTableProps {
  dateRange: string;
}

export async function HighCostTransactionsTable({ dateRange }: HighCostTransactionsTableProps) {
  const transactions = await fetchHighCostTransactionsData(dateRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>High-Cost Transactions</CardTitle>
        <CardDescription>Largest business expenses in the selected period</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}