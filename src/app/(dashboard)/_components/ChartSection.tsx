import React from 'react'
import ReachChart from './ReachChart'
import { EngagementChart } from './EngagementChartt'

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ReachChart/>
      <EngagementChart/>
    </div>
  )
}

export default ChartSection
