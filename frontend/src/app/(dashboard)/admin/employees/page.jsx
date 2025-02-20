"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Briefcase } from 'lucide-react';

// Mock data representing employee growth and types
const mockEmployeeData = {
  totalWorkers: 25,
  workerTypes: {
    employees: 18,
    managers: 7
  },
  salaryExpenses: 75000,
  employeeGrowth: [
    { month: 'Jan', workers: 10 },
    { month: 'Feb', workers: 12 },
    { month: 'Mar', workers: 15 },
    { month: 'Apr', workers: 18 },
    { month: 'May', workers: 22 },
    { month: 'Jun', workers: 25 }
  ],
  departmentDistribution: [
    { department: 'Sales', count: 8 },
    { department: 'Marketing', count: 5 },
    { department: 'Engineering', count: 7 },
    { department: 'Finance', count: 3 },
    { department: 'Support', count: 2 }
  ]
};

export default function EmployeeOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Employee Overview</h2>
        <p className="text-gray-500">Overview of the employees statistiques</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Workers
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEmployeeData.totalWorkers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Employees
            </CardTitle>
            <Briefcase className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEmployeeData.workerTypes.employees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Managers
            </CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEmployeeData.workerTypes.managers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Expenses */}
      <div className="mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Salary Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockEmployeeData.salaryExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEmployeeData.employeeGrowth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="workers" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEmployeeData.departmentDistribution}>
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}