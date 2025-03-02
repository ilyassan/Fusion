import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { PerformerItem } from "./PerformerItem";

export interface PerformerData {
  name: string;
  deals: number;
  revenue: number;
}

interface TopPerformersProps {
  performers: PerformerData[];
}

export const TopPerformers = ({ performers }: TopPerformersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-500" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performers.map((performer, index) => (
            <PerformerItem key={index} performer={performer} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};