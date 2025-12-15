import DashboardHeader from "../../../components/shared/DashboardHeader";
import ChartSection from "../_components/ChartSection";
import QuickOverview from "../_components/QuickOverview";

const DashboardHome = () => {
  return (
    <div>
      <DashboardHeader
        title="Dashboard Overview"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <div className="px-5 lg:px-6 pb-6 flex flex-col gap-6">
        <QuickOverview />
        <ChartSection />
      </div>
    </div>
  );
};

export default DashboardHome;
