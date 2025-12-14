"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQueryParams } from "@/types/query.types";

export const getAllPages = async (query: TQueryParams[]) => {
  const params = new URLSearchParams();

  if (query && query.length > 0) {
    query.forEach(({ key, value }) => {
      params.append(key, value);
    });
  }
  const result = await apiRequest(`pages?${params.toString()}`, {
    method: "GET",
  });

  return result;
};

export const getPageByPageId = async (pageId: string) => {
  const result = await apiRequest(`pages/${pageId}`, {
    method: "GET",
  });

  return result;
};

export const getPageFeedByPageIdAndAccessToken = async (pageId: string) => {
  const result = await apiRequest(`pages/feed/${pageId}`, {
    method: "GET",
  });

  return result;
};
