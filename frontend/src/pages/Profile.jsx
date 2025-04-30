import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchWithAuth("/profile");
        const allPosts = await fetchWithAuth("/posts");
        const userPosts = allPosts.filter((post) => post.user?.id === userData.id);

        setUser(userData);
        setPosts(userPosts);
      } catch (error) {
        console.error("❌ Error fetching profile or posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!user) return <div className="p-6 text-red-500">Failed to load profile.</div>;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center font-bold text-white text-2xl">
            {user.name?.[0]}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-4 mb-4 border"
            >
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}