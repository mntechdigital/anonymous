import DashboardHeader from "@/components/shared/DashboardHeader";
import TeamMembersList from "./_components/TeamMembersList";
import { getAdmins } from "@/services/admin/admin";
import { AdminUser } from "@/types/admin.types";

const AdministrationPage = async () => {
  let members = await getAdmins();

  if (members && typeof members === "object" && "data" in members) {
    members = (members as { data: AdminUser[] }).data;
  }
  
  return (
    <div>
      <DashboardHeader
        title="Administration"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <div className="px-5 lg:px-6 py-6">
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
