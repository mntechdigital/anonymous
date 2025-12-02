"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Photo", value: 100 },
  { name: "Video", value: 60 },
  { name: "Link", value: 80 },
  { name: "Text", value: 40 },
  { name: "Story", value: 70 },
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

export function EngagementChart() {
  const [selectedMonth, setSelectedMonth] = useState("November")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-2xl bg-card rounded-lg p-6 shadow-sm border border-border">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Engagement by Post Type</h2>
          <p className="text-sm text-muted-foreground mt-1">Total engagement per content type</p>
        </div>

        {/* Month Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-muted rounded-md transition-colors"
          >
            {selectedMonth}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-10">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm ${
                    selectedMonth === month ? "bg-muted font-semibold" : ""
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
