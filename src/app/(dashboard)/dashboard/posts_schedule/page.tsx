
import PostsScheduleHeader from "./_components/PostsScheduleHeader";
import PostsContent from "./_components/PostsContent";

async function getPostsData(): Promise<any> {
  try {
    // Replace with your actual API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/post/all-posts`, {
      method: "GET",
      cache: "no-store", // Disable cache for fresh data
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: any = await response.json();
    console.log(data,"this is responswe ");
    
    return data;
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
}
const PostsSchedulePage = async () => {
  const postsData = await getPostsData();

  return (
    <div className="p-6">
      <PostsScheduleHeader />

      {postsData.success ? (
        <PostsContent
          published={postsData.data.published}
          scheduled={postsData.data.scheduled}
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
