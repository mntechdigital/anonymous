import DashboardHeader, {
  DashboardMiniHeader,
} from "@/components/shared/DashboardHeader";
import PageOverviews from "./_components/PageOverviews";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllPages } from "@/services/pages";
import Pages from "./_components/Pages";

const FacebookPages = async () => {
  const facebookPages = await getAllPages([]);
  console.log(facebookPages);
  return (
    <div className="p-6">
      <DashboardHeader
        title="All Facebook Pages Performance"
        description="Manage and monitor all your Facebook pages"
      />

      <PageOverviews />

      <div className="flex items-center justify-between pr-5 lg:pr-6">
        <DashboardMiniHeader
          title="All Facebook Pages"
          description="View & Manage all your Facebook pages"
        />

        <div className="relative">
          <Search className="absolute ml-3 mt-2 text-gray-400 size-5" />
          <Input placeholder="Search page" type="text" className="outline-none shadow-none pl-10 rounded-full w-96" />
        </div>
      </div>

      <Pages data={facebookPages.data} />
    </div>
  );
};

export default FacebookPages;
