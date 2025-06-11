import Linkify from 'linkify-react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon as HeartIconOutline,
  BookmarkIcon as BookmarkIconOutline
} from "@heroicons/react/24/outline";

import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from "@heroicons/react/24/solid";


export default function PostItem({ post }) {
  const options = { target: '_blank' };
  const avatarPath = post.user?.avatar_path
    ? `http://127.0.0.1:8000/storage/avatars/${post.user.avatar_path}`
    : null;

  const formattedDate = dayjs(post.created_at).format("MMM D, YYYY");
  const fullDateTime = dayjs(post.created_at).format("MMMM D, YYYY h:mm A");

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
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{post.user?.name}</span>
            <span
              className="text-gray-500 cursor-default group relative"
            >
              · {formattedDate}
              <div className="whitespace-nowrap absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
                {fullDateTime}
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* Post content + icons, aligned */}
      <div className="">
        <p className="text-gray-800 mb-4 ml-14 whitespace-pre-line">
          <Linkify options={options}>{post.content}</Linkify>
        </p>

        {/* Action Icons */}
        <div className="flex items-center justify-around text-gray-500 mt-2">
          {/* Comment */}
          <div className="relative group">
            <button className="hover:text-blue-500 transition">
              <ChatBubbleLeftIcon className="w-5 h-5" />
            </button>
            <div className="whitespace-nowrap absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
              Comment
            </div>
          </div>

          {/* Repost */}
          <div className="relative group">
            <button className="hover:text-green-500 transition">
              <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            </button>
            <div className="whitespace-nowrap absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
              Repost
            </div>
          </div>

          {/* Like */}
          <div className="relative group">
            <button className="transition group hover:text-pink-500">
              {post.is_liked ? (
                <HeartIconSolid className="w-5 h-5 text-pink-500" />
              ) : (
                <HeartIconOutline className="w-5 h-5 group-hover:text-pink-500 text-gray-500" />
              )}
            </button>
            <div className="whitespace-nowrap absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
              {post.is_liked ? "Liked!" : "Like"}
            </div>
          </div>

          {/* Save */}
          <div className="relative group">
            <button className="transition group hover:text-yellow-500">
              {post.is_saved ? (
                <BookmarkIconSolid className="w-5 h-5 text-yellow-500" />
              ) : (
                <BookmarkIconOutline className="w-5 h-5 group-hover:text-yellow-500 text-gray-500" />
              )}
            </button>
            <div className="whitespace-nowrap absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
              {post.is_saved ? "Saved!" : "Save"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
