import PostsScheduleHeader from "./_components/PostsScheduleHeader";
import PostsContent from "./_components/PostsContent";
import { getAllPosts } from "@/services/post/post";

const PostsSchedulePage = async () => {
  const postsData = await getAllPosts();

  return (
    <div className="p-6">
      <PostsScheduleHeader />

      {postsData.success ? (
        <PostsContent
          published={postsData.data.published.filter(
            (post) => post.published === true
          )}
          scheduled={postsData.data.published.filter(
            (post) => post.published === false
          )}
        />
      ) : (
        <div className="mt-10 text-center py-8 text-red-500">
          {postsData.message}
        </div>
      )}
    </div>
  );
};

export default PostsSchedulePage;
