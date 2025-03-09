import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchRecurringExpensesData } from "../data/fetchRecurringExpensesData";

interface RecurringExpensesTableProps {
  dateRange: string;
}

export async function RecurringExpensesTable({ dateRange }: RecurringExpensesTableProps) {
  const expenses = await fetchRecurringExpensesData(dateRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recurring Expenses</CardTitle>
        <CardDescription>Regular ongoing expenses such as subscriptions</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>${expense.amount.toLocaleString()}</TableCell>
                <TableCell>{expense.frequency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}