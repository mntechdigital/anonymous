import { FacebookPost } from "@/types/page.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ExternalLink, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

const PageFeed = ({ pageFeed }: { pageFeed: FacebookPost[] }) => {
    console.dir(pageFeed[0], {depth: null});
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getImageUrl = (post: FacebookPost) => {
    // Try to get image from attachments first
    if (post.attachments?.data?.[0]?.media?.image?.src) {
      return post.attachments.data[0].media.image.src;
    }
    // Fallback to full_picture
    if (post.full_picture) {
      return post.full_picture;
    }
    return null;
  };

  const getAttachmentCount = (post: FacebookPost) => {
    if (post.attachments?.data?.[0]?.subattachments?.data) {
      return post.attachments.data[0].subattachments.data.length;
    }
    return post.attachments?.data?.length || 0;
  };

  return (
    <section className="mt-6">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">No</TableHead>
              <TableHead>Post</TableHead>
              <TableHead className="w-24 text-center">Reach</TableHead>
              <TableHead className="w-28 text-center">Impression</TableHead>
              <TableHead className="w-20 text-center">Likes</TableHead>
              <TableHead className="w-24 text-center">Comments</TableHead>
              <TableHead className="w-20 text-center">Shares</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageFeed && pageFeed.length > 0 ? (
              pageFeed.map((post, index) => {
                const imageUrl = getImageUrl(post);
                const attachmentCount = getAttachmentCount(post);

                return (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-start gap-3">
                        {/* Post Image */}
                        <div className="relative shrink-0">
                          {imageUrl ? (
                            <>
                              <Image
                                src={imageUrl}
                                alt={post.message || "Post image"}
                                width={80}
                                height={80}
                                className="rounded-md object-cover size-20"
                              />
                              {attachmentCount > 1 && (
                                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                  +{attachmentCount - 1}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="size-20 bg-gray-100 rounded-md flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No image
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Post Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">
                            {(post.message)?.substring(0, 50) || (
                              <span className="text-gray-400 italic">
                                No message
                              </span>
                            )}
                          </p>
                          
                          {post.attachments?.data?.[0]?.title && (
                            <p className="text-xs text-gray-500 mt-1">
                              {post.attachments.data[0].title}
                            </p>
                          )}

                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-xs text-gray-500">
                              {formatDate(post.created_time)}
                            </p>
                            <Link
                              href={post.permalink_url}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                            >
                              View Post
                              <ExternalLink className="size-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm text-gray-600">-</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm text-gray-600">-</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <Heart className="size-4 text-red-500 mb-1" />
                        <span className="text-sm font-semibold">
                          {post.likes?.summary?.total_count || 0}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <MessageCircle className="size-4 text-blue-500 mb-1" />
                        <span className="text-sm font-semibold">
                          {post.comments?.summary?.total_count || 0}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm font-semibold text-gray-600">
                        -
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No posts available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default PageFeed;
