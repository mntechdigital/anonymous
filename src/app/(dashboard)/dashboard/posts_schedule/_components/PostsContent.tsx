"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "./PostCard";

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

interface PostsContentProps {
  published: Post[];
  scheduled: Post[];
}

export const PostsContent: React.FC<PostsContentProps> = ({
  published,
  scheduled,
}) => {
  return (
    <div className="flex w-full flex-col gap-6 mt-10">
      <Tabs defaultValue="scheduled">
        <TabsList>
          <TabsTrigger value="scheduled">
            Scheduled ({scheduled.length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Published ({published.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          {scheduled && scheduled.length > 0 ? (
            <div className="mt-4">
              {scheduled.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No scheduled posts
            </div>
          )}
        </TabsContent>

        <TabsContent value="published">
          {published && published.length > 0 ? (
            <div className="mt-4">
              {published.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No published posts
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostsContent;
