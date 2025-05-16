import Linkify from 'linkify-react';


export default function PostItem({ post }) {
  const options = { target: '_blank' };
  const avatarPath = post.user?.avatar_path
    ? `http://127.0.0.1:8000/storage/avatars/${post.user.avatar_path}`
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-2">
        {avatarPath ? (
          <img
            src={avatarPath}
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
      <p className="text-gray-800 mb-2 whitespace-pre-line">
        <Linkify options={options}>{post.content}</Linkify>
      </p>
    </div>
  );
}
