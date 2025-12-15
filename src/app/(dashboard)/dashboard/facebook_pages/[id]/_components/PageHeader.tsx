import DashboardHeader from "@/components/shared/DashboardHeader";
import Image from "next/image";

interface PageData {
  picture?: {
    data?: {
      url: string;
    };
  };
  name: string;
  followers_count: number;
}

interface PageHeaderProps {
  pageDetails: {
    data: PageData;
  };
}

export default function PageHeader({ pageDetails }: PageHeaderProps) {
  return (
    <section className="flex items-center justify-between">
      <DashboardHeader
        title="Page Details"
        description={`Detailed information about ${pageDetails?.data?.name}`}
      />

      <div className="flex items-center gap-5 border px-3 py-1 rounded-full">
        <div>
          <Image
            src={pageDetails?.data?.picture?.data?.url || ""}
            alt={pageDetails?.data?.name || "Page Picture"}
            width={100}
            height={100}
            className="size-8 rounded-full object-contain border"
          />
        </div>
        <div>
          <h2 className="font-bold text-sm">{pageDetails?.data?.name}</h2>
          <p className="text-xs text-gray-600">
            {pageDetails?.data?.followers_count} Followers
          </p>
        </div>
      </div>
    </section>
  );
}
