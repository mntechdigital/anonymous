import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

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

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const publishDate = new Date(post.scheduled_publish_time * 1000);
  const createdDate = new Date(post.createdAt);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Page Avatar */}
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={post.page.image} alt={post.page.name} />
          <AvatarFallback>{getInitials(post.page.name)}</AvatarFallback>
        </Avatar>

        {/* Post Content */}
        <div className="flex-1">
          {/* Header with page name and status badge */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-sm">{post.page.name}</p>
              <p className="text-xs text-gray-500">{post.page.category}</p>
            </div>
            <div className="flex gap-2">
              {post.published ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">
                  Published
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">
                  Scheduled
                </span>
              )}
            </div>
          </div>

          {/* Post Content Text */}
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {post.content}
          </p>

          {/* Footer with timestamps */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex gap-4">
              <span>
                Created: {formatDistanceToNow(createdDate, { addSuffix: true })}
              </span>
              <span>
                {post.published ? "Published" : "Publishing"}:{" "}
                {formatDistanceToNow(publishDate, { addSuffix: true })}
              </span>
            </div>
            <span className="text-gray-400">#ID: {post.id.slice(0, 8)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
