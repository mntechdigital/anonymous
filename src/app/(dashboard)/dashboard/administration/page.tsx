import DashboardHeader from "@/components/shared/DashboardHeader";
import TeamMembersList from "./_components/TeamMembersList";
import { TeamMember } from "@/types/team.types";

// Mock data - replace with actual API call
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "P.B. Shelley",
    email: "example@gmail.com",
    role: "Admin 1",
    avatarUrl: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Hamnet Shakespeare",
    email: "example@gmail.com",
    role: "Admin 2",
    avatarUrl: "/avatars/shakespeare.png",
  },
  {
    id: "3",
    name: "Miguel de Cervantes",
    email: "example@gmail.com",
    role: "Admin 3",
    avatarUrl: "/avatars/cervantes.png",
  },
  {
    id: "4",
    name: "Charles Dickens",
    email: "example@gmail.com",
    role: "Editor 1",
    avatarUrl: "/avatars/dickens.png",
  },
  {
    id: "5",
    name: "Franz Kafka",
    email: "example@gmail.com",
    role: "Editor 2",
    avatarUrl: "/avatars/kafka.png",
  },
  {
    id: "6",
    name: "Christopher Marlowe",
    email: "example@gmail.com",
    role: "Moderator 1",
    avatarUrl: "/avatars/marlowe.png",
  },
  {
    id: "7",
    name: "Edmund Spenser",
    email: "example@gmail.com",
    role: "Moderator 2",
    avatarUrl: "/avatars/spenser.png",
  },
];

const AdministrationPage = () => {
  return (
    <div>
      <DashboardHeader
        title="Administration"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <div className="px-5 lg:px-6 py-6">
        <TeamMembersList
          title="Team Members (Page Owner)"
          description="Manage your team and their page & access"
          members={mockTeamMembers}
        />
      </div>
    </div>
  );
};

export default AdministrationPage;
