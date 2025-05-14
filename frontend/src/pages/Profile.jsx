import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import PostItem from "../components/PostItem";

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
    <div>
      <div className="border-b border-gray-200 p-4 flex items-center space-x-4">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
            {user.name?.[0]}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      </div>

      <div>
        {posts.length === 0 ? (
          <div className="p-4 text-gray-600">No posts yet.</div>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
