import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ChartSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 rounded mt-2"></div>
      </CardHeader>
      <CardContent className="h-[300px] w-full flex items-center justify-center">
        <div className="h-full w-full bg-gray-200 rounded animate-pulse"></div>
      </CardContent>
    </Card>
  );
}