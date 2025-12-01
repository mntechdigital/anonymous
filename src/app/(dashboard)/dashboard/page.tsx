import DashboardHeader from "../../../components/shared/DashboardHeader";
import QuickOverview from "../_components/QuickOverview";

const DashboardHome = () => {
  return (
    <div>
      <DashboardHeader
        title="Dashboard Overview"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <QuickOverview />
    </div>
  );
};

export default DashboardHome;
