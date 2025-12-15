"use server";

import { apiRequest } from "@/lib/apiRequest";

const POST_BASE = `post`;

interface Post {
  id: string;
  content: string;
  facebookPostIds: string;
  scheduled_publish_time: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  pageId: string;
  page: {
    id: string;
    name: string;
    category: string;
    pageId: string;
    image: string;
    status: string;
  };
}

interface PostsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    published: Post[];
    scheduled: Post[];
  };
}

export const getAllPosts = async (): Promise<PostsResponse> => {
  try {
    const response = await apiRequest(`${POST_BASE}/all-posts`, {
      method: "GET",
      authRequired: false, // Adjust based on your API requirements
    });

    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      statusCode: 500,
      message: error instanceof Error ? error.message : "Failed to fetch posts",
      data: {
        published: [],
        scheduled: [],
      },
    };
  }
};

export const getPublishedPosts = async (): Promise<Post[]> => {
  const response = await getAllPosts();
  if (response.success) {
    return response.data.published.filter((post) => post.published === true);
  }
  return [];
};

export const getScheduledPosts = async (): Promise<Post[]> => {
  const response = await getAllPosts();
  if (response.success) {
    return response.data.published.filter((post) => post.published === false);
  }
  return [];
};
