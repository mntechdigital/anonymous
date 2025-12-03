import {
  getPageByPageId,
  getPageFeedByPageIdAndAccessToken,
} from "@/services/pages";
import React from "react";

const PageDetails = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const pageDetails = await getPageByPageId(id);
  const pageFeed = await getPageFeedByPageIdAndAccessToken(id);
  console.log(pageDetails, "page Details");
  console.dir(pageFeed, {depth: null});
  return <div>{id}</div>;
};

export default PageDetails;
