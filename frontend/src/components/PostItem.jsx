export default function PostItem({ post }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-2">
        {post.user?.avatar_url ? (
          <img
            src={post.user.avatar_url}
            alt={`${post.user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
            {post.user?.name?.[0]}
          </div>
        )}
        <span className="font-semibold text-gray-800">{post.user?.name}</span>
      </div>
      <p className="text-gray-700 text-base">{post.content}</p>
      {post.image && (
        <img
          src={`http://127.0.0.1:8000/storage/${post.image}`}
          alt="Post"
          className="w-full max-h-96 object-cover rounded-lg mt-3 border"
        />
      )}
    </div>
  );
}
