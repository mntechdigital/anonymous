"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface AudienceByAgeProps {
  data: Array<{
    ageRange: string;
    percentage: number;
    fill: string;
  }>;
}

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
} satisfies ChartConfig;

export default function AudienceByAgeChart({ data }: AudienceByAgeProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Audience by Age</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Last 30 days performance</p>
        </div>
        <select className="text-sm border rounded-md px-3 py-1.5 text-gray-600">
          <option>November</option>
          <option>December</option>
        </select>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="relative flex items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px] w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="percentage"
                nameKey="ageRange"
                innerRadius={80}
                outerRadius={120}
                strokeWidth={0}
              />
            </PieChart>
          </ChartContainer>

          {/* Top Left */}
          <div className="absolute top-8 left-12">
            <div className="bg-gray-800 text-white px-3 py-2 rounded-lg">
              <p className="text-xl font-bold">{data[1]?.percentage}%</p>
              <p className="text-xs">Age: {data[1]?.ageRange}</p>
            </div>
          </div>

          {/* Top Right */}
          <div className="absolute top-0 right-8">
            <div className="bg-orange-500 text-white px-3 py-2 rounded-lg">
              <p className="text-xl font-bold">{data[3]?.percentage}%</p>
              <p className="text-xs">Age: {data[3]?.ageRange}</p>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-0 left-4">
            <div className="bg-pink-500 text-white px-3 py-2 rounded-lg">
              <p className="text-xl font-bold">{data[2]?.percentage}%</p>
              <p className="text-xs">Age: {data[2]?.ageRange}</p>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-8 right-12">
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg">
              <p className="text-xl font-bold">{data[0]?.percentage}%</p>
              <p className="text-xs">Age: {data[0]?.ageRange}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
