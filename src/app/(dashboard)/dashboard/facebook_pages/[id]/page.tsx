import {
  getPageByPageId,
  getPageFeedByPageIdAndAccessToken,
} from "@/services/pages";
import PageHeader from "./_components/PageHeader";
import PageStatsSection from "./_components/PageStatsSection";
import PageFeed from "./_components/PageFeed";

const PageDetails = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const pageDetails = await getPageByPageId(id);
  const pageFeed = await getPageFeedByPageIdAndAccessToken(id);
  return (
    <main className="p-5 md:p-6">
      <PageHeader pageDetails={pageDetails} />
      <PageStatsSection pageDetails={pageDetails} />
      <PageFeed pageFeed={pageFeed?.data?.data} />
    </main>
  );
};

export default PageDetails;
