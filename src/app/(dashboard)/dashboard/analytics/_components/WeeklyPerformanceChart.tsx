"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface WeeklyPerformanceProps {
  data: Array<{
    day: string;
    engagement: number;
    impressions: number;
    reach: number;
  }>;
}

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "#EF4444",
  },
  impressions: {
    label: "Impressions",
    color: "#6366F1",
  },
  reach: {
    label: "Reach",
    color: "#06B6D4",
  },
} satisfies ChartConfig;

export default function WeeklyPerformanceChart({
  data,
}: WeeklyPerformanceProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Weekly Performance</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Last 30 days performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="text-sm text-gray-600">Engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
              <span className="text-sm text-gray-600">Impressions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
              <span className="text-sm text-gray-600">Reach</span>
            </div>
          </div>
          <select className="text-sm border rounded-md px-3 py-1.5 text-gray-600">
            <option>1st Week</option>
            <option>2nd Week</option>
            <option>3rd Week</option>
            <option>4th Week</option>
          </select>
          <select className="text-sm border rounded-md px-3 py-1.5 text-gray-600">
            <option>November</option>
            <option>December</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillEngagement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="engagement"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillEngagement)"
            />
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillImpressions)"
            />
            <Area
              type="monotone"
              dataKey="reach"
              stroke="#06B6D4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillReach)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
