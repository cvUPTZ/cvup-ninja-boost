import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

interface EventsChartProps {
  eventStats: Array<{
    name: string;
    value: number;
  }>;
}

export const EventsChart = ({ eventStats }: EventsChartProps) => {
  const chartConfig = {
    data: {
      theme: {
        light: "#ffbd59",
        dark: "#ffbd59",
      },
    },
  };

  return (
    <Card className="bg-white shadow-md p-6 mb-8">
      <CardHeader>
        <CardTitle>Event Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <BarChart data={eventStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="var(--color-data)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};