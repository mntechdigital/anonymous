import { EngagementChart } from "./EngagementChartt"
import ReachChart from "./ReachChart"

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-4">
      <div className="w-full h-[350px]">
        <ReachChart />
      </div>

      <div className="w-full h-[350px]">
        <EngagementChart />
      </div>
    </div>
  )
}

export default ChartSection
