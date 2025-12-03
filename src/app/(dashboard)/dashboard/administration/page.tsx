import DashboardHeader from "@/components/shared/DashboardHeader";
import TeamMembersList from "./_components/TeamMembersList";
import { getAdmins } from "@/services/admin/admin";

const AdministrationPage = async () => {
  const members = await getAdmins();
  
  return (
    <div>
      <DashboardHeader
        title="Administration"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <div className="px-5 lg:px-6 pb-6">
        <TeamMembersList
          title="Team Members"
          description="Manage your team and their access"
          members={members}
        />
      </div>
    </div>
  );
};

export default AdministrationPage;
