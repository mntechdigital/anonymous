"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface PageReachProps {
  data: Array<{
    date: string;
    lastMonth: number;
    thisMonth: number;
  }>;
}

const chartConfig = {
  lastMonth: {
    label: "Last Month",
    color: "#6366F1",
  },
  thisMonth: {
    label: "This Month",
    color: "#06B6D4",
  },
} satisfies ChartConfig;

export default function PageReachChart({ data }: PageReachProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Page Reach</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Last 30 days performance
            </p>
          </div>
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
              <linearGradient id="fillLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillThisMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="lastMonth"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillLastMonth)"
            />
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#06B6D4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillThisMonth)"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
            <span className="text-sm text-gray-600">Last Month</span>
            <span className="text-sm font-semibold">243.4k</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
            <span className="text-sm text-gray-600">This Month</span>
            <span className="text-sm font-semibold">643.4k</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
