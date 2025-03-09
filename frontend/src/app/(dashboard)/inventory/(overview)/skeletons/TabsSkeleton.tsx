import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TabsSkeleton() {
  return (
    <Card>
      <CardHeader className="animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 rounded mt-2"></div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}