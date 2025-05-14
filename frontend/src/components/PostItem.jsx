export default function PostItem({ post }) {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition">
      <div className="flex items-start space-x-3">
        {post.user?.avatar_url ? (
          <img
            src={post.user.avatar_url}
            alt={`${post.user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            {post.user?.name?.[0]}
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold">{post.user?.name}</div>
          <p className="text-gray-800">{post.content}</p>
          {post.image && (
            <img
              src={`http://127.0.0.1:8000/storage/${post.image}`}
              alt="Post media"
              className="w-full max-h-96 object-cover rounded mt-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}
