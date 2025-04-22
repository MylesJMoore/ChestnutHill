import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Chestnut Hill Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 bg-gray-800 rounded">
            <p>{post.content}</p>
            <small>By: {post.user.name}</small>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default App;