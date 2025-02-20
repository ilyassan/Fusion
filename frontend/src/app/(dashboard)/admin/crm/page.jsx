"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, PhoneCall, Mail, Calendar, Clock, Activity, Target, User } from 'lucide-react';

// Mock data for CRM dashboard
const mockCRMData = {
  pipeline: [
    { stage: 'Lead', value: 245, amount: 125000 },
    { stage: 'Proposal ', value: 180, amount: 95000 },
    { stage: 'Negotiation', value: 85, amount: 68000 },
    { stage: 'Closed', value: 35, amount: 38000 }
  ],
  recentActivities: [
    { type: 'call', contact: 'John Smith', company: 'Tech Corp', time: '2h ago', status: 'completed' },
    { type: 'email', contact: 'Sarah Johnson', company: 'Digital Solutions', time: '3h ago', status: 'pending' },
    { type: 'meeting', contact: 'Mike Brown', company: 'Innovation Labs', time: '5h ago', status: 'scheduled' },
    { type: 'task', contact: 'Lisa Anderson', company: 'Global Services', time: '1d ago', status: 'completed' }
  ],
  upcomingTasks: [
    { task: 'Follow-up call', contact: 'David Wilson', time: 'Today, 2:00 PM' },
    { task: 'Proposal review', contact: 'Emma Davis', time: 'Today, 4:30 PM' },
    { task: 'Client meeting', contact: 'Robert Taylor', time: 'Tomorrow, 10:00 AM' },
    { task: 'Contract signing', contact: 'Jennifer White', time: 'Tomorrow, 3:00 PM' }
  ],
  topPerformers: [
    { name: 'OCP', deals: 28, revenue: 156000 },
    { name: 'Maroc Telecom', deals: 24, revenue: 142000 },
    { name: 'Goverment', deals: 22, revenue: 128000 },
    { name: 'Ansamble', deals: 20, revenue: 115000 }
  ],
  conversionMetrics: {
    leadToOpportunity: 35,
    opportunityToProposal: 65,
    proposalToClose: 45,
    averageTimeToClose: 18
  }
};

// Colors for the charts
const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

// Reusable Activity Card Component
const ActivityCard = ({ activity }) => {
  const iconMap = {
    call: <PhoneCall className="h-4 w-4 mt-1 text-green-500" />,
    email: <Mail className="h-4 w-4 mt-1 text-blue-500" />,
    meeting: <Users className="h-4 w-4 mt-1 text-purple-500" />,
    task: <Activity className="h-4 w-4 mt-1 text-orange-500" />
  };

  return (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
      {iconMap[activity.type]}
      <div>
        <p className="font-medium">{activity.contact}</p>
        <p className="text-sm text-gray-500">{activity.company}</p>
        <p className="text-xs text-gray-400">{activity.time}</p>
      </div>
    </div>
  );
};

// Reusable Task Card Component
const TaskCard = ({ task }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
    <div className="w-2 h-2 rounded-full bg-blue-500" />
    <div>
      <p className="font-medium">{task.task}</p>
      <p className="text-sm text-gray-500">{task.contact}</p>
      <p className="text-xs text-gray-400">{task.time}</p>
    </div>
  </div>
);

export default function CRMDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="text-gray-500">Comprehensive snapshot of your CRM performance</p>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Pipeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Sales Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCRMData.pipeline}>
                  <XAxis dataKey="stage" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="value" fill="#3B82F6" name="Leads" />
                  <Bar yAxisId="right" dataKey="amount" fill="#10B981" name="Amount ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Conversion Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(mockCRMData.conversionMetrics).map(([key, value], index) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{value}{key.includes('Time') ? ' days' : '%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${value}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCRMData.recentActivities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCRMData.upcomingTasks.map((task, index) => (
                <TaskCard key={index} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCRMData.topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-500 font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-gray-500">{performer.deals} deals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${performer.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}