import DashboardHeader from "../../../components/shared/DashboardHeader";
import ChartSection from "../_components/ChartSection";
import QuickOverview from "../_components/QuickOverview";

const DashboardHome = () => {
  return (
    <div className="">
      <DashboardHeader
        title="Dashboard Overview"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <QuickOverview />
      <ChartSection/>
    </div>
  );
};

export default DashboardHome;
