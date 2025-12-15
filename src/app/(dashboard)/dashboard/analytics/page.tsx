import DashboardHeader from "@/components/shared/DashboardHeader";
import { analyticsData } from "./_data/analyticsData";
import MetricCard from "./_components/MetricCard";
import WeeklyPerformanceChart from "./_components/WeeklyPerformanceChart";
import AudienceByAgeChart from "./_components/AudienceByAgeChart";
import AudienceByGenderChart from "./_components/AudienceByGenderChart";
import PageReachChart from "./_components/PageReachChart";
import AudienceByCountryChart from "./_components/AudienceByCountryChart";
import TopLocationsChart from "./_components/TopLocationsChart";

export default function AnalyticsPage() {
  return (
    <div className="">
      <DashboardHeader
        title="Insights & Analytics"
        description="Detailed performance metrics and audience data"
      />

      <div className="px-5 lg:px-6 pb-6 flex flex-col gap-6">
        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {analyticsData.metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              isPositive={metric.isPositive}
              compareText={metric.compareText}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        {/* Weekly Performance Chart */}
        <WeeklyPerformanceChart data={analyticsData.weeklyPerformance} />

        {/* Audience Demographics - Age and Gender */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AudienceByAgeChart data={analyticsData.audienceByAge} />
          <AudienceByGenderChart data={analyticsData.audienceByGender} />
        </div>

        {/* Page Reach Chart */}
        <PageReachChart data={analyticsData.pageReach} />

        {/* Audience by Country and Top Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AudienceByCountryChart data={analyticsData.audienceByCountry} />
          <TopLocationsChart data={analyticsData.topLocations} />
        </div>
      </div>
    </div>
  );
}
