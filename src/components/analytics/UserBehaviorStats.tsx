import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
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
  return (
    <div className="space-y-6">
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