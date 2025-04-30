import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-800">Saved Posts</h1>
      {savedPosts.length === 0 ? (
        <p className="text-gray-600">No saved posts yet.</p>
      ) : (
        savedPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-4 mb-4 border">
            <div className="flex items-center space-x-3 mb-2">
              {post.user?.avatar_url ? (
                <img
                  src={post.user.avatar_url}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-white font-bold">
                  {post.user?.name?.charAt(0)}
                </div>
              )}
              <span className="font-semibold">{post.user?.name}</span>
            </div>
            <p className="text-gray-800 mb-2">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
