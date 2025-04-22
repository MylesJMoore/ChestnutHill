import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Chestnut Hill Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="bg-gray-800 p-4 rounded shadow">
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={`http://127.0.0.1:8000/storage/${post.image}`}
                  alt="Post image"
                  className="mt-2 rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home