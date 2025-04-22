export default function PostItem({ post }) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4 border">
        <div className="flex items-center space-x-3 mb-2">
          {post.user?.avatar_url ? (
            <img
              src={post.user.avatar_url}
              alt={`${post.user.name}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-white font-bold">
              {post.user?.name?.[0]}
            </div>
          )}
          <span className="font-semibold">{post.user?.name}</span>
        </div>
        <p className="text-gray-800 mb-2">{post.content}</p>
        {post.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${post.image}`}
            alt="Post"
            className="w-full max-h-96 object-cover rounded mt-2"
          />
        )}
      </div>
    );
  }