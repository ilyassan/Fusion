import { Card, CardContent } from "@/components/ui/card";

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <CardContent className="pt-6 flex items-center animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded-full mr-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}