import { useState } from "react";
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
import { fetchWithAuth } from "../utils/api";

export default function PostItem({ post }) {
  const options = { target: '_blank' };
  const avatarPath = post.user?.avatar_path
    ? `http://127.0.0.1:8000/storage/avatars/${post.user.avatar_path}`
    : null;

  const formattedDate = dayjs(post.created_at).format("MMM D, YYYY");
  const fullDateTime = dayjs(post.created_at).format("MMMM D, YYYY h:mm A");

  const imageUrl = post.image
    ? `http://127.0.0.1:8000/storage/${post.image}`
    : null;

  const [liked, setLiked] = useState(post.is_liked);
  const [saved, setSaved] = useState(post.is_saved);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const toggleLike = async () => {
    if (loadingLike) return;
    setLoadingLike(true);
    try {
      const method = liked ? "DELETE" : "POST";
      await fetchWithAuth(`/posts/${post.id}/like`, { method });
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to toggle like", err);
    } finally {
      setLoadingLike(false);
    }
  };

  const toggleSave = async () => {
    if (loadingSave) return;
    setLoadingSave(true);
    try {
      await fetchWithAuth(`/posts/${post.id}/save`, { method: "POST" });
      setSaved(!saved);
    } catch (err) {
      console.error("Failed to toggle save", err);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6 hover:shadow-md transition">
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
            <span className="text-gray-500 cursor-default group relative">
              · {formattedDate}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow whitespace-nowrap">
                {fullDateTime}
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* Content + Image wrapper */}
      <div className="ml-0 md:ml-14">
        <p className="text-gray-800 mb-4 whitespace-pre-line">
          <Linkify options={options}>{post.content}</Linkify>
        </p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post image"
            className="mt-5 mb-5 max-h-80 rounded-lg w-full object-cover border border-gray-200"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around text-gray-500 mt-2">
        {/* Comment */}
        <div className="relative group">
          <button className="hover:text-blue-500 transition">
            <ChatBubbleLeftIcon className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
            Comment
          </div>
        </div>

        {/* Repost */}
        <div className="relative group">
          <button className="hover:text-green-500 transition">
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow">
            Repost
          </div>
        </div>

        {/* Like */}
        <div className="relative group">
          <button onClick={toggleLike} disabled={loadingLike} className="transition group">
            {liked ? (
              <HeartIconSolid className="w-5 h-5 text-pink-500" />
            ) : (
              <HeartIconOutline className="w-5 h-5 group-hover:text-pink-500 text-gray-500" />
            )}
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow whitespace-nowrap">
            {liked ? "Liked!" : "Like"}
          </div>
        </div>

        {/* Save */}
        <div className="relative group">
          <button onClick={toggleSave} disabled={loadingSave} className="transition group">
            {saved ? (
              <BookmarkIconSolid className="w-5 h-5 text-yellow-500" />
            ) : (
              <BookmarkIconOutline className="w-5 h-5 group-hover:text-yellow-500 text-gray-500" />
            )}
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow whitespace-nowrap">
            {saved ? "Saved!" : "Save"}
          </div>
        </div>
      </div>
    </div>
  );
}
