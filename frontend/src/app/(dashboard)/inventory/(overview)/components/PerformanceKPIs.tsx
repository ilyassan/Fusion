import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, PercentIcon, AlertTriangle, ArrowUpRight } from "lucide-react";
import { fetchPerformanceData } from "../data/fetchPerformanceData";


export async function PerformanceKPIs() {

  const kpidData = await fetchPerformanceData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Stock Quantity</CardTitle>
          <Package className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpidData.totalStockQuantity.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight className="h-4 w-4" />
              20.1%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Stock Value</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${kpidData.totalStockValue.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight className="h-4 w-4" />
              10.5%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Products vs Services</CardTitle>
          <PercentIcon className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpidData.productServiceSplit.products}% / {kpidData.productServiceSplit.services}%
          </div>
          <p className="text-gray-500 text-sm mt-1">Products / Services split</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Low Stock Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpidData.lowStockItems}</div>
          <p className="text-gray-500 text-sm mt-1">Items need restocking</p>
        </CardContent>
      </Card>
    </div>
  );
}