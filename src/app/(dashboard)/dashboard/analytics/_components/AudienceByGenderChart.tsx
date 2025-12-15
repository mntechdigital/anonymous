"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface AudienceByGenderProps {
  data: Array<{
    gender: string;
    percentage: number;
    fill: string;
  }>;
}

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
} satisfies ChartConfig;

export default function AudienceByGenderChart({ data }: AudienceByGenderProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Audience by Gender</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Total engagement per segment core
          </p>
        </div>
        <select className="text-sm border rounded-md px-3 py-1.5 text-gray-600">
          <option>November</option>
          <option>December</option>
        </select>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex flex-col items-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[280px] w-[280px]"
          >
            <PieChart width={280} height={280}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="percentage"
                nameKey="gender"
                innerRadius={70}
                outerRadius={110}
                strokeWidth={0}
                label={(entry) => `${entry.percentage}%`}
                labelLine={false}
              />
            </PieChart>
          </ChartContainer>
          <div className="flex items-center gap-6 mt-6">
            {data.map((item) => (
              <div key={item.gender} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-gray-600">{item.gender}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
