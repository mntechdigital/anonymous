import { Card } from "@/components/ui/card";
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

  const getStatusBadgeColor = (published: boolean) => {
    return published ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700";
  };

  const getStatusLabel = (published: boolean) => {
    return published ? "Published" : "Scheduled";
  };

  return (
    <Card className="p-4 mb-3 bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        {/* Status Badge */}
        <div className="flex items-center justify-start">
          <span className={`${getStatusBadgeColor(post.published)} text-xs font-semibold px-3 py-1 rounded-full`}>
            {getStatusLabel(post.published)}
          </span>
        </div>

        {/* Post Content */}
        <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
          {post.content}
        </p>

        {/* Footer with timestamp and more info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            📅 {formatDistanceToNow(publishDate, { addSuffix: true })}
          </span>
          <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
            More info
          </a>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
