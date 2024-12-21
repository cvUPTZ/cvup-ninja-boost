import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrackingMetrics, PageMetric, TrackingBehavior } from '@/services/tracking/types';

interface UserBehaviorStatsProps {
  metrics: TrackingMetrics;
  pageMetrics: PageMetric[];
  behavior: TrackingBehavior;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const UserBehaviorStats: React.FC<UserBehaviorStatsProps> = ({
  metrics,
  pageMetrics,
  behavior,
  timeRange,
}) => {
  // Calculate engagement score (0-100)
  const engagementScore = Math.min(
    100,
    Math.round(
      (behavior.clickEvents.reduce((acc, event) => acc + event.clicks, 0) +
        behavior.scrollDepth.reduce((acc, depth) => acc + depth.count, 0)) / 10
    )
  );

  // Calculate retention rate (example calculation)
  const retentionRate = Math.round(
    (metrics.returningVisitors / metrics.uniqueVisitors) * 100
  );

  // Format session duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const deviceDistribution = [
    { name: 'Desktop', value: behavior.deviceStats.desktop },
    { name: 'Mobile', value: behavior.deviceStats.mobile },
    { name: 'Tablet', value: behavior.deviceStats.tablet },
  ];

  const COLORS = ['#1A1F2C', '#ffbd59', '#4A5568'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-cvup-purple">Engagement Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cvup-purple">
              {engagementScore}%
            </div>
            <p className="text-sm text-gray-600">Based on clicks and scroll depth</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-cvup-purple">User Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cvup-purple">
              {retentionRate}%
            </div>
            <p className="text-sm text-gray-600">Returning visitors rate</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-cvup-purple">Avg. Session Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cvup-purple">
              {formatDuration(metrics.averageSessionDuration)}
            </div>
            <p className="text-sm text-gray-600">Time spent per visit</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-cvup-purple">Device Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-cvup-purple">User Journey Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={behavior.userFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#ffbd59" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Keep existing cards */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-cvup-purple">Page Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Path</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Unique Views</TableHead>
                  <TableHead>Avg. Time (s)</TableHead>
                  <TableHead>Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageMetrics.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{page.path}</TableCell>
                    <TableCell>{page.views}</TableCell>
                    <TableCell>{page.uniqueViews}</TableCell>
                    <TableCell>{page.averageTimeOnPage}</TableCell>
                    <TableCell>{page.bounceRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-cvup-purple">Click Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={behavior.clickEvents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="elementId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#ffbd59" name="Total Clicks" />
                <Bar dataKey="uniqueClicks" fill="#1A1F2C" name="Unique Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-cvup-purple">Scroll Depth Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={behavior.scrollDepth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="percentage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ffbd59" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
