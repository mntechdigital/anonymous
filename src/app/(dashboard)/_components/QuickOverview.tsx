import { TrendingUp, TrendingDown, BarChart3, Heart, Users, Flag } from "lucide-react"

export default function QuickOverview() {
  const stats = [
    {
      label: "Total Pages",
      value: "129",
      icon: BarChart3,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "All Active",
      trendType: "neutral",
      trendValue: null,
    },
    {
      label: "Avg. Engagement",
      value: "54.4K",
      icon: Heart,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      trend: "1.3% Up from past week",
      trendType: "up",
      trendValue: "+1.3%",
    },
    {
      label: "Avg. Followers",
      value: "332+",
      icon: Users,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "1.8% Up from yesterday",
      trendType: "up",
      trendValue: "+1.8%",
    },
    {
      label: "Avg. Reach",
      value: "24K",
      icon: Flag,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "4.3% Down from yesterday",
      trendType: "down",
      trendValue: "-4.3%",
    },
  ]

  return (
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} rounded-full p-3`}>
                  <Icon className={`${stat.iconColor} w-6 h-6`} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {stat.trendType === "up" && (
                  <>
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm text-cyan-500">{stat.trend}</span>
                  </>
                )}
                {stat.trendType === "down" && (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">{stat.trend}</span>
                  </>
                )}
                {stat.trendType === "neutral" && <span className="text-sm text-cyan-500">{stat.trend}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
