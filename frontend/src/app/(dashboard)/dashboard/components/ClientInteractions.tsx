import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the type for each client interaction
interface ClientInteraction {
  id: number
  client: string
  type: string
  date: string
  summary: string
}

// Define props type for the component
interface ClientInteractionsProps {
  interactions: ClientInteraction[]
}

export function ClientInteractions({ interactions }: ClientInteractionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          Recent Client Interactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interactions.map((interaction) => (
              <TableRow key={interaction.id}>
                <TableCell className="font-medium">{interaction.client}</TableCell>
                <TableCell>{interaction.type}</TableCell>
                <TableCell>{interaction.date}</TableCell>
                <TableCell>{interaction.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}