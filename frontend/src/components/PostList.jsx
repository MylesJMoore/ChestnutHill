import { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error loading posts", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-green-800">Chestnut Hill Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
}