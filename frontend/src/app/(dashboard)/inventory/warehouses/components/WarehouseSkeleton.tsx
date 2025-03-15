import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const WarehouseSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
        <div className="flex gap-3">
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/4 bg-gray-300 rounded mt-2"></div>
          </div>
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div>
            <div className="h-3 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
              <div className="flex-1 h-2 bg-gray-300 rounded"></div>
              <div className="h-4 w-8 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="h-8 w-full bg-gray-300 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
};