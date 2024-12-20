// components/analytics/UserBehaviorStats.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UserBehaviorStatsProps {
  metrics: UserMetrics;
  pageMetrics: PageMetrics[];
  behavior: UserBehavior;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const UserBehaviorStats = ({
  metrics,
  pageMetrics,
  behavior,
  timeRange,
  onTimeRangeChange,
}: UserBehaviorStatsProps) => {
  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Page Views"
          value={metrics.pageViews}
          trend="+12.3%"
          description="Total page views"
        />
        <MetricCard
          title="Unique Visitors"
          value={metrics.uniqueVisitors}
          trend="+5.7%"
          description="Distinct users"
        />
        <MetricCard
          title="Avg. Time Spent"
          value={`${metrics.averageTimeSpent}m`}
          trend="-2.1%"
          description="Time per session"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${metrics.bounceRate}%`}
          trend="-1.5%"
          description="Single page sessions"
        />
      </div>

      {/* Page Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Page Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Path</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Unique Views</TableHead>
                <TableHead>Avg. Time</TableHead>
                <TableHead>Bounce Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageMetrics.map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-medium">{page.path}</TableCell>
                  <TableCell>{page.views}</TableCell>
                  <TableCell>{page.uniqueViews}</TableCell>
                  <TableCell>{page.averageTimeOnPage}s</TableCell>
                  <TableCell>{page.bounceRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Click Events */}
      <Card>
        <CardHeader>
          <CardTitle>Click Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={behavior.clickEvents}>
                <XAxis dataKey="elementId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#8884d8" />
                <Bar dataKey="uniqueClicks" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Scroll Depth Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Scroll Depth Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={behavior.scrollDepth}>
                <XAxis dataKey="percentage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, trend, description }: {
  title: string;
  value: string | number;
  trend: string;
  description: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <span className={`text-xs ${
        trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }`}>
        {trend}
      </span>
    </CardContent>
  </Card>
);
