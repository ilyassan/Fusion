import { Suspense } from "react";
import PredictionMetrics from "./components/PredictionMetrics";
import Recommendations from "./components/Recommendations";
import ActionableInsights from "./components/ActionableInsights";
import SalesForecastChart from "./components/SalesForecastChart";
import { fetchPredictionMetrics, fetchForecastData, fetchRecommendations, fetchInsights } from "./data/insightsData";
import ChartSkeleton from "@/app/(dashboard)/components/ChartSkeleton";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

// Main page component
export default function InsightsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">AI Sales Forecast & Insights</h2>
          <p className="text-sm text-gray-500">Predictive analytics and intelligent insights</p>
        </div>
      </div>

      {/* AI Prediction Metrics */}
      <Suspense fallback={<PredictionMetricsSkeleton />}>
        <PredictionMetricsSection />
      </Suspense>

      {/* Main Forecast Section (Charts) */}
      <Suspense fallback={<SalesForecastSkeleton />}>
        <SalesForecastSection />
      </Suspense>

      {/* AI Recommendations */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <RecommendationsSection />
      </Suspense>

      {/* Actionable Insights Feed */}
      <Suspense fallback={<ActionableInsightsSkeleton />}>
        <ActionableInsightsSection />
      </Suspense>
    </div>
  );
}

// Async section components fetching their own data
async function PredictionMetricsSection() {
  const metrics = await fetchPredictionMetrics();
  return <PredictionMetrics metrics={metrics} />;
}

async function SalesForecastSection() {
  const forecastData = await fetchForecastData();
  return <SalesForecastChart data={forecastData} />;
}

async function RecommendationsSection() {
  const recommendations = await fetchRecommendations();
  return <Recommendations recommendations={recommendations} />;
}

async function ActionableInsightsSection() {
  const insights = await fetchInsights();
  return <ActionableInsights insights={insights} />;
}

// Skeleton fallbacks
function PredictionMetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full">
          <div className="p-4 sm:p-6 border rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-20 mt-2" />
                <Skeleton className="h-4 w-40 mt-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SalesForecastSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="border rounded-lg bg-white">
          <div className="p-4 sm:p-6">
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="p-4">
            <ChartSkeleton />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="border rounded-lg bg-white">
          <div className="p-4 sm:p-6">
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationsSkeleton() {
  return (
    <div className="border rounded-lg bg-white">
      <div className="p-4 sm:p-6">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionableInsightsSkeleton() {
  return (
    <div className="border rounded-lg bg-white">
      <div className="p-4 sm:p-6">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex-grow w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full mt-1" />
              </div>
              <Skeleton className="h-8 w-full sm:w-24 mt-2 sm:mt-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}