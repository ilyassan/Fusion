import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Segment {
  name: string;
  count: number;
  revenue: number;
}

interface CustomerSegmentsProps {
  segments: Segment[];
}

export function CustomerSegments({ segments }: CustomerSegmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          Customer Segments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Segment</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segments.map((segment) => (
              <TableRow key={segment.name}>
                <TableCell className="font-medium">{segment.name}</TableCell>
                <TableCell>{segment.count}</TableCell>
                <TableCell>${segment.revenue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}