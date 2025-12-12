"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { name: "Page 1", value: 28000 },
  { name: "Page 2", value: 32000 },
  { name: "Page 3", value: 43000 },
  { name: "Page 4", value: 75000 },
  { name: "Page 5", value: 20000 },
  { name: "Page 6", value: 52000 },
  { name: "Page 7", value: 60000 },
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function ReachChart() {
  const [selectedMonth, setSelectedMonth] = useState("November")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Reach Over Time</CardTitle>
          <CardDescription>Last 30 days performance</CardDescription>
        </div>

        {/* Month Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            {selectedMonth}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-10">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                    selectedMonth === month ? "bg-muted font-semibold" : ""
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full h-58">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={true} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "14px" }} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "14px" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value) => value.toLocaleString()}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
