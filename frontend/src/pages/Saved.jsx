import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import PostItem from "../components/PostItem";

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSavedPosts() {
      try {
        const data = await fetchWithAuth("/saved-posts");
        setSavedPosts(data);
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSavedPosts();
  }, []);

  if (loading) return <div className="p-6">Loading saved posts...</div>;

  return (
    <div>
      <div className="border-b border-gray-200 p-4 text-xl font-bold">
        Saved Posts
      </div>
      {savedPosts.length === 0 ? (
        <div className="p-4 text-gray-600">No saved posts yet.</div>
      ) : (
        savedPosts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </div>
  );
}
