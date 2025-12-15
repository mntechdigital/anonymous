"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CountryData {
  country: string;
  percentage: number;
  followers: string;
}

interface AudienceByCountryProps {
  data: CountryData[];
}

export default function AudienceByCountryChart({
  data,
}: AudienceByCountryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Audience by Country</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Last 30 days performance</p>
        </div>
        <select className="text-sm border rounded-md px-3 py-1.5 text-gray-600">
          <option>November</option>
          <option>December</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.country} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-4">{index + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.country}</span>
                  <span className="text-sm font-semibold">
                    {item.followers}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage * 5}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
