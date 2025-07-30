import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import CreatePost from "./CreatePost";
import { fetchWithAuth } from "../utils/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const data = await fetchWithAuth("/posts");
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-green-800">Chestnut Hill Posts</h1>

      {/* Post creation input */}
      <CreatePost onPostCreated={loadPosts} />

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
}
