import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 animate-pulse">
            <CardTitle className="text-sm font-medium text-gray-500">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </CardTitle>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </CardHeader>
          <CardContent className="animate-pulse">
            <div className="text-2xl font-bold">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center mt-1">
              {index < 2 ? (
                <>
                  <span className="text-green-500 text-sm flex items-center">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </span>
                </>
              ) : (
                <div className="text-gray-500 text-sm mt-1">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}